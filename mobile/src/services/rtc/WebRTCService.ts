import { RTCPeerConnection, RTCSessionDescription, MediaStream } from 'react-native-webrtc'
import WebSocketService from '../socket/WebSocketService'

class WebRTCService {
    private peerConnection: RTCPeerConnection
    private dataChannel: RTCDataChannel | null = null
    private localStream: MediaStream | null = null
    private onRemoteStream?: (stream: MediaStream) => void
    private websocketService: WebSocketService

    constructor() {
        // Khởi tạo peer connection với các cấu hình ICE servers
        this.peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        })

        // Khởi tạo WebSocketService để giao tiếp với server
        this.websocketService = new WebSocketService('')

        // Lắng nghe các sự kiện của peer connection
        this.initializeEventListeners()
    }

    /**
     * Khởi tạo các event listeners cho peerConnection.
     */
    private initializeEventListeners() {
        this.peerConnection.addEventListener('icecandidate', this.handleICECandidate)
        this.peerConnection.addEventListener('track', this.handleTrack)
        this.peerConnection.addEventListener('datachannel', this.handleDataChannel)
    }

    /**
     * Bắt đầu kết nối bằng cách tạo offer và gửi tới server.
     */
    async startConnection() {
        const sessionConstraints = {
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        }

        try {
            const offer = await this.peerConnection.createOffer(sessionConstraints)
            await this.peerConnection.setLocalDescription(offer)

            // Gửi offer tới server qua WebSocket
            this.sendSignal({ type: 'offer', sdp: offer })
        } catch (error) {
            console.error('Error starting connection:', error)
        }
    }

    /**
     * Xử lý tín hiệu từ server (offer, answer, ice-candidate).
     */
    async handleSignal(signal: any) {
        try {
            switch (signal.type) {
                case 'answer':
                    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp))
                    break
                case 'ice-candidate':
                    await this.peerConnection.addIceCandidate(signal.candidate)
                    break
                default:
                    console.warn('Unknown signal type:', signal.type)
            }
        } catch (error) {
            console.error('Error handling signal:', error)
        }
    }

    /**
     * Xử lý ICE candidate và gửi nó tới server.
     */
    private handleICECandidate(event: any) {
        if (event.candidate) {
            this.sendSignal({ type: 'ice-candidate', candidate: event.candidate })
        }
    }

    /**
     * Xử lý stream được nhận từ remote peer.
     */
    private handleTrack(event: any) {
        const [stream] = event.streams
        this.localStream = stream
        this.onRemoteStream?.(stream) // Gọi callback khi có remote stream
    }

    /**
     * Xử lý DataChannel khi có sự kiện mới.
     */
    private handleDataChannel(event: any) {
        this.dataChannel = event.channel
        this.dataChannel?.addEventListener('message', this.handleDataMessage)
    }

    /**
     * Xử lý tin nhắn nhận được qua DataChannel.
     */
    private handleDataMessage(message: any) {
        console.log('Received message:', message)
    }

    /**
     * Gửi tín hiệu đến server qua WebSocket.
     */
    private sendSignal(signal: any) {
        this.websocketService.sendMessage(signal)
    }

    /**
     * Thiết lập handler cho remote stream.
     */
    setRemoteStreamHandler(handler: (stream: MediaStream) => void) {
        this.onRemoteStream = handler
    }
}

export default WebRTCService
