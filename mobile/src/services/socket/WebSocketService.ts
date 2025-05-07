import { WebSocketMessage } from '@/types/WebSocketMessage'

class WebSocketService {
    private socket: WebSocket | null = null
    private isConnected: boolean = false
    private url: string

    constructor(url: string) {
        this.url = url
    }

    connect(): void {
        if (!this.socket) {
            this.socket = new WebSocket(this.url)

            this.socket.onopen = () => {
                this.isConnected = true
                console.log('WebSocket connection established')
            }

            this.socket.onmessage = (event: MessageEvent) => {
                this.handleMessage(event)
            }

            this.socket.onerror = (error: Event) => {
                console.error('WebSocket Error: ', error)
            }

            this.socket.onclose = () => {
                this.isConnected = false
                console.log('WebSocket connection closed')
            }
        }
    }

    sendMessage<Data>(key: string, data: Data): void {
        if (this.socket && this.isConnected) {
            const message: WebSocketMessage<Data> = {
                Key: key,
                data: data
            }
            this.socket.send(JSON.stringify(message))
        } else {
            console.warn('WebSocket is not connected')
        }
    }

    handleMessage(event: MessageEvent): void {
        const message: WebSocketMessage<any> = JSON.parse(event.data)

        switch (message.Key) {
            case 'someKey':
                console.log('Handling message with someKey:', message.data)
                break
            default:
                console.log('Unknown message Key:', message.Key)
                break
        }
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close()
        }
    }
}

export default WebSocketService
