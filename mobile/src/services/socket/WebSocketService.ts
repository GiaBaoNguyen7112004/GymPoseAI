import { eventHandlerObjType, EventHandlerType, SignalMessage } from '@/types/transport'

interface WebsocketServiceOptions {
    url: string
    maxReconnectAttempts?: number
    reconnectInterval?: number // ms
}

class WebSocketService {
    private socket: WebSocket | null = null
    private connected = false
    private readonly url: string

    private eventHandlers: eventHandlerObjType = {}
    private onOpenCallbacks: (() => void)[] = []

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
            console.error('[WebSocket] Failed to parse message:', error)
        }
    }

    private handleError = (error: Event): void => {
        console.error('[WebSocket] Error:', error)
        const handler = this.eventHandlers['error']
        handler?.(error)
    }

    private handleClose = (): void => {
        this.connected = false
        this.socket = null
        console.log('[WebSocket] Connection closed')

        if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++
            console.log(`[WebSocket] Attempting reconnect #${this.reconnectAttempts}`)
            setTimeout(() => this.connect(), this.reconnectInterval)
        } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.warn('[WebSocket] Reconnect limit reached. Giving up.')
        }
    }

    sendMessage<Data>(message: SignalMessage<Data>): void {
        const json = JSON.stringify(message)
        if (this.socket && this.connected && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(json)
        } else {
            console.warn('[WebSocket] Socket not connected, queueing message')
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
        this.socket?.close()
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
}

export default WebSocketService
