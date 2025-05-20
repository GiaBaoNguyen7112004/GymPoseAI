import { eventHandlerObjType, EventHandlerType, SignalMessage } from '@/types/transport'

interface WebsocketServiceOptions {
    url: string
    maxReconnectAttempts?: number
    reconnectInterval?: number // ms
}

type ConnectionStatus = 'closed' | 'reconnecting' | 'reconnect_failed' | 'connected'
type ConnectionStatusCallback = (status: ConnectionStatus) => void

const MESSAGES = {
    PARSE_ERROR: '[WebSocket] Failed to parse message:',
    ERROR: '[WebSocket] Error:',
    CONNECTION_CLOSED: '[WebSocket] Connection closed',
    RECONNECT_ATTEMPT: (attempt: number) => `[WebSocket] Attempting reconnect #${attempt}`,
    RECONNECT_LIMIT: '[WebSocket] Reconnect limit reached. Giving up.',
    NOT_CONNECTED: '[WebSocket] Socket not connected, queueing message'
} as const

class WebSocketService {
    private socket: WebSocket | null = null
    private connected = false
    private readonly url: string

    private eventHandlers: eventHandlerObjType = {}
    private onOpenCallbacks: (() => void)[] = []
    private connectionStatusCallback: ConnectionStatusCallback | null = null

    private shouldReconnect = true
    private reconnectAttempts = 0
    private maxReconnectAttempts: number
    private reconnectInterval: number
    private pendingMessages: string[] = []

    constructor(options: WebsocketServiceOptions) {
        this.url = options.url
        this.maxReconnectAttempts = options.maxReconnectAttempts ?? 5
        this.reconnectInterval = options.reconnectInterval ?? 2000
    }

    connect(): void {
        if (this.socket != null) return

        this.shouldReconnect = true
        this.socket = new WebSocket(this.url)
        this.initSocketEvents()

        this.socket.onopen = () => {
            this.connected = true
            this.reconnectAttempts = 0
            this.onOpenCallbacks.forEach((cb) => cb())
            this.onOpenCallbacks = []
            this.flushPendingMessages()
            this.connectionStatusCallback?.('connected')
        }
    }

    private initSocketEvents(): void {
        if (!this.socket) return
        this.socket.onmessage = this.handleMessage
        this.socket.onerror = this.handleError
        this.socket.onclose = this.handleClose
    }

    private handleMessage = (event: MessageEvent): void => {
        try {
            const message: SignalMessage<any> = JSON.parse(event.data)
            const handler = this.eventHandlers[message.type]
            handler?.(message.data)
        } catch (error) {
            console.error(MESSAGES.PARSE_ERROR, error)
        }
    }

    private handleError = (error: Event): void => {
        console.error(MESSAGES.ERROR, error)
        const handler = this.eventHandlers['error']
        handler?.(error)
    }

    private handleClose = (): void => {
        this.connected = false
        this.socket = null
        console.log(MESSAGES.CONNECTION_CLOSED)
        this.connectionStatusCallback?.('closed')

        if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++
            console.log(MESSAGES.RECONNECT_ATTEMPT(this.reconnectAttempts))
            this.connectionStatusCallback?.('reconnecting')
            setTimeout(() => this.connect(), this.reconnectInterval)
        } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn(MESSAGES.RECONNECT_LIMIT)
            this.connectionStatusCallback?.('reconnect_failed')
        }
    }

    sendMessage<Data>(message: SignalMessage<Data>): void {
        const json = JSON.stringify(message)
        if (this.socket && this.connected && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(json)
        } else {
            console.warn(MESSAGES.NOT_CONNECTED)
            this.pendingMessages.push(json)
        }
    }

    private flushPendingMessages(): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) return

        while (this.pendingMessages.length > 0) {
            const msg = this.pendingMessages.shift()
            if (msg) this.socket.send(msg)
        }
    }

    on(eventType: string, handler: EventHandlerType): void {
        this.eventHandlers[eventType] = handler
    }

    off(eventType: string): void {
        delete this.eventHandlers[eventType]
    }

    disconnect(): void {
        this.shouldReconnect = false

        if (this.socket) {
            this.socket.onmessage = null
            this.socket.onopen = null
            this.socket.onclose = null
            this.socket.onerror = null
            this.socket.close()
        }

        this.socket = null
        this.connected = false

        this.eventHandlers = {}
        this.onOpenCallbacks = []
        this.pendingMessages = []
        this.connectionStatusCallback = null
    }

    isConnected(): boolean {
        return this.connected
    }

    waitForReady(): Promise<void> {
        return new Promise((resolve) => {
            if (this.socket?.readyState === WebSocket.OPEN) {
                resolve()
            } else {
                this.onOpenCallbacks.push(resolve)
            }
        })
    }

    onConnectionStatusChange(callback: ConnectionStatusCallback): void {
        this.connectionStatusCallback = callback
    }
}

export default WebSocketService
