import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, MediaStream } from 'react-native-webrtc'

import WebSocketService from '../socket/WebSocketService'

import RTCTrackEvent from 'react-native-webrtc/lib/typescript/RTCTrackEvent'
import RTCDataChannelEvent from 'react-native-webrtc/lib/typescript/RTCDataChannelEvent'
import RTCIceCandidateEvent from 'react-native-webrtc/lib/typescript/RTCIceCandidateEvent'
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel'
import MessageEvent from 'react-native-webrtc/lib/typescript/MessageEvent'

import { SignalMessage, EventHandlerType, eventHandlerObjType } from '@/types/transport'

interface WebRTCServiceOptions {
    wsSignalingUrl: string
}

/**
 * WebRTCService handles peer connection, signaling via WebSocket,
 * media streaming, and DataChannel messaging.
 */
class WebRTCService {
    private peerConnection: RTCPeerConnection
    private dataChannel: RTCDataChannel | null = null
    private localStream: MediaStream | null = null
    private remoteStreamHandler?: (stream: MediaStream) => void
    private readonly signaling: WebSocketService
    private eventHandlers: eventHandlerObjType = {}

    constructor(options: WebRTCServiceOptions) {
        this.signaling = new WebSocketService({ url: options.wsSignalingUrl })
        this.signaling.connect()

        this.peerConnection = this.createPeerConnection()

        this.initPeerListeners()
        this.initSignalingListeners()
    }

    /** Create peer connection with STUN servers */
    private createPeerConnection(): RTCPeerConnection {
        return new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        })
    }

    /** Register all WebRTC native event listeners */
    private initPeerListeners(): void {
        this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate)
        this.peerConnection.addEventListener('track', this.handleTrack)
        this.peerConnection.addEventListener('datachannel', this.handleDataChannel)
    }

    /** Handle ICE candidates and send them to the signaling server */
    private handleIceCandidate = (event: RTCIceCandidateEvent<'icecandidate'>): void => {
        if (event.candidate) {
            this.sendSignal('icecandidate', event.candidate)
        }
    }

    /** Handle incoming remote media stream */
    private handleTrack = (event: RTCTrackEvent<'track'>): void => {
        const [stream] = event.streams
        this.localStream = stream
        this.remoteStreamHandler?.(stream)
    }

    /** Receive incoming data channel from remote peer */
    private handleDataChannel = (event: RTCDataChannelEvent<'datachannel'>): void => {
        this.dataChannel = event.channel
        this.dataChannel.addEventListener('message', this.handleDataMessage)
    }

    /** Create data channel (used by caller only) */
    private createDataChannel(): void {
        this.dataChannel = this.peerConnection.createDataChannel('chat_channel')

        this.dataChannel.addEventListener('message', this.handleDataMessage)
    }

    /** Send a message via DataChannel */
    sendData(message: SignalMessage<any>): void {
        const payload = JSON.stringify(message)

        if (this.dataChannel && this.dataChannel.readyState === 'open') {
            this.dataChannel.send(payload)
        } else {
            console.warn('[WebRTC] DataChannel is not open.')
        }
    }

    /** Register external handler for incoming messages */
    on(type: string, handler: EventHandlerType): void {
        this.eventHandlers[type] = handler
    }

    /** Handle received message via DataChannel */
    private handleDataMessage = (event: MessageEvent<'message'>): void => {
        try {
            const message: SignalMessage<any> = JSON.parse(event.data as string)
            const handler = this.eventHandlers[message.type]
            handler?.(message.data)
        } catch (error) {
            console.error('[WebRTC] Failed to parse message:', error)
        }
    }

    /** Register signaling server listeners */
    private initSignalingListeners(): void {
        this.signaling.on('answer', async (data) => {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data))
        })

        this.signaling.on('icecandidate', async (data) => {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
        })
    }

    /** Send signaling message to the WebSocket server */
    private sendSignal(type: string, data: any): void {
        this.signaling.sendMessage({ type, data })
    }

    /** Initiate offer and send it via signaling */
    async startConnection(): Promise<void> {
        await this.signaling.waitForReady()

        this.createDataChannel()

        const offer = await this.peerConnection.createOffer({
            offerToReceiveAudio: false,
            offerToReceiveVideo: true
        })

        await this.peerConnection.setLocalDescription(offer)
        this.sendSignal('offer', offer)
    }

    /** Add local media stream to peer connection */
    addLocalStream(stream: MediaStream): void {
        this.localStream = stream

        stream.getTracks().forEach((track) => {
            this.peerConnection.addTrack(track, stream)
        })
    }

    /** Register handler to receive remote stream */
    setRemoteStreamHandler(handler: (stream: MediaStream) => void): void {
        this.remoteStreamHandler = handler
    }
    getConnectionState(): RTCPeerConnectionState {
        return this.peerConnection.connectionState
    }
    getSignalingState(): RTCSignalingState {
        return this.peerConnection.signalingState
    }

    /** Close all connections and cleanup */
    closeConnection(): void {
        // Close data channel
        if (this.dataChannel) {
            this.dataChannel.removeEventListener('message', this.handleDataMessage)
            this.dataChannel.close()
            this.dataChannel = null
        }

        // Stop local media stream tracks
        this.localStream?.getTracks().forEach((track) => track.stop())
        this.localStream = null

        // Remove event listeners from peer connection
        this.peerConnection.removeEventListener('icecandidate', this.handleIceCandidate)
        this.peerConnection.removeEventListener('track', this.handleTrack)
        this.peerConnection.removeEventListener('datachannel', this.handleDataChannel)

        // Close peer connection
        this.peerConnection.close()

        // Disconnect signaling
        this.signaling.disconnect()

        // Reset handlers
        this.remoteStreamHandler = undefined
        this.eventHandlers = {}
    }
}

export default WebRTCService
