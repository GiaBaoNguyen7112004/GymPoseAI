import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, MediaStream } from 'react-native-webrtc'
import RTCTrackEvent from 'react-native-webrtc/lib/typescript/RTCTrackEvent'
import RTCDataChannelEvent from 'react-native-webrtc/lib/typescript/RTCDataChannelEvent'
import RTCIceCandidateEvent from 'react-native-webrtc/lib/typescript/RTCIceCandidateEvent'
import RTCDataChannel from 'react-native-webrtc/lib/typescript/RTCDataChannel'
import MessageEvent from 'react-native-webrtc/lib/typescript/MessageEvent'

import WebSocketService from '../socket/WebSocketService'
import { MessageKey } from '@/constants/messageKey'
import { DataChannelMessage } from '@/types/transport'
import { DataChannelMessageMap, isMessageKey } from '@/types/messagePayloadMap'
import { ResponseTrainingPayload, TrainingPayload } from '@/types/payloadWithWebRTCTypes'

type EventHandlerMap = {
    [K in keyof DataChannelMessageMap]?: (data: DataChannelMessageMap[K]) => void
}

interface WebRTCServiceOptions {
    wsSignalingUrl: string
}

class WebRTCService {
    private static instance: WebRTCService
    private peerConnection: RTCPeerConnection
    private dataChannel: RTCDataChannel | null = null
    private localStream: MediaStream | null = null
    private remoteStreamHandler?: (stream: MediaStream) => void
    private readonly signaling: WebSocketService
    private eventHandlers: EventHandlerMap = {}
    private isReconnecting = false
    private isTrainingActive = false
    private userId: string = ''
    private signalingErrorHandler: (error: Event) => void = () => {}

    private constructor(options: WebRTCServiceOptions) {
        this.signaling = new WebSocketService({ url: options.wsSignalingUrl })
        this.signaling.connect()

        this.peerConnection = this.createPeerConnection()
        this.initPeerListeners()
        this.initSignalingListeners()
    }

    public static getInstance(options: WebRTCServiceOptions): WebRTCService {
        if (!WebRTCService.instance) {
            WebRTCService.instance = new WebRTCService(options)
        }
        return WebRTCService.instance
    }

    private createPeerConnection(): RTCPeerConnection {
        return new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    }

    private initPeerListeners(): void {
        this.peerConnection.addEventListener('icecandidate', this.handleIceCandidate)
        this.peerConnection.addEventListener('track', this.handleTrack)
        this.peerConnection.addEventListener('datachannel', this.handleDataChannel)
        this.peerConnection.addEventListener('connectionstatechange', this.handleConnectionStateChange)
    }

    private handleConnectionStateChange = (): void => {
        const state = this.peerConnection.connectionState
        console.log('[WebRTC] Connection state changed:', state)
        if (['failed', 'disconnected', 'closed'].includes(state)) {
            this.attemptReconnect()
        }
    }

    private async attemptReconnect(): Promise<void> {
        if (this.isReconnecting) return
        this.isReconnecting = true
        console.log('[WebRTC] Attempting to reconnect...')

        try {
            this.peerConnection.close()
        } catch (e) {
            console.warn('[WebRTC] Failed to close peer connection:', e)
        }

        this.startConnection()
        this.isReconnecting = false
    }
    isConnected(): boolean {
        return this.peerConnection.connectionState === 'connected'
    }
    private handleIceCandidate = (event: RTCIceCandidateEvent<'icecandidate'>): void => {
        if (event.candidate) this.sendSignal('icecandidate', event.candidate)
    }

    private handleTrack = (event: RTCTrackEvent<'track'>): void => {
        const [stream] = event.streams
        this.localStream = stream
        this.remoteStreamHandler?.(stream)
    }

    private handleDataChannel = (event: RTCDataChannelEvent<'datachannel'>): void => {
        this.dataChannel = event.channel
        this.setupDataChannel()
    }

    private createDataChannel(): void {
        this.dataChannel = this.peerConnection.createDataChannel('chat_channel')
        this.setupDataChannel()
    }

    private setupDataChannel(): void {
        if (!this.dataChannel) return

        this.dataChannel.addEventListener('open', () => console.log('[WebRTC] Data channel opened'))
        this.dataChannel.addEventListener('close', () => console.log('[WebRTC] Data channel closed'))
        this.dataChannel.addEventListener('message', this.handleDataMessage)
        this.dataChannel.addEventListener('error', (error) => console.error('[WebRTC] Data channel error:', error))
    }

    private initSignalingListeners(): void {
        this.signaling.on('answer', async (data) => {
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data))
        })
        this.signaling.on('icecandidate', async (data) => {
            await this.peerConnection.addIceCandidate(new RTCIceCandidate(data))
        })
        this.signaling.on('error', this.handleSignalingError)
    }

    private handleSignalingError = (error: Event): void => {
        console.error('[WebRTC] Signaling error:', error)
        this.signalingErrorHandler?.(error)
    }
    private sendSignal(type: string, data: any): void {
        this.signaling.sendMessage({ type, data })
    }

    private handleDataMessage = (event: MessageEvent<'message'>): void => {
        try {
            const { key, data } = JSON.parse(event.data as string) as { key: string; data: unknown }

            if (isMessageKey(key)) {
                this.handleTypedMessage(key, data)
            } else {
                console.warn('[WebRTC] Unknown message type:', key)
            }
        } catch (error) {
            console.error('[WebRTC] Failed to parse message:', error)
        }
    }

    private handleTypedMessage<K extends keyof DataChannelMessageMap>(key: K, data: unknown): void {
        const handler = this.eventHandlers[key]
        if (handler) {
            handler(data as DataChannelMessageMap[K])
        }
    }

    sendData<K extends keyof DataChannelMessageMap>(message: DataChannelMessage<K>): void {
        if (this.dataChannel) {
            this.dataChannel.send(JSON.stringify(message))
        } else {
            console.warn('[WebRTC] DataChannel is not open')
        }
    }

    on<K extends keyof DataChannelMessageMap>(type: K, handler: (data: DataChannelMessageMap[K]) => void): void {
        this.eventHandlers[type] = handler as EventHandlerMap[K]
    }
    async startConnection(): Promise<void> {
        const signalingState = this.signaling.isConnected()
        if (signalingState === false) {
            this.signaling.connect()
        }
        await this.signaling.waitForReady()

        if (
            ['closed'].includes(this.peerConnection.signalingState) ||
            ['closed'].includes(this.peerConnection.connectionState)
        ) {
            this.peerConnection = this.createPeerConnection()
            this.initPeerListeners()
        }

        this.createDataChannel()
        const offer = await this.peerConnection.createOffer({
            offerToReceiveAudio: false,
            offerToReceiveVideo: true
        })
        await this.peerConnection.setLocalDescription(offer)
        this.sendSignal('offer', offer)
    }

    onSignalingError(handler: (error: Event) => void): void {
        this.signalingErrorHandler = handler
    }

    addLocalStream(stream: MediaStream): void {
        this.localStream = stream
        stream.getTracks().forEach((track) => this.peerConnection.addTrack(track, stream))
    }

    setRemoteStreamHandler(handler: (stream: MediaStream) => void): void {
        this.remoteStreamHandler = handler
    }

    getConnectionState(): RTCPeerConnectionState {
        return this.peerConnection.connectionState
    }
    getSignalingState(): RTCSignalingState {
        return this.peerConnection.signalingState
    }

    closeConnection(): void {
        this.dataChannel?.removeEventListener('message', this.handleDataMessage)
        this.dataChannel?.close()
        this.dataChannel = null

        this.localStream?.getTracks().forEach((track) => track.stop())
        this.localStream = null

        this.peerConnection.removeEventListener('icecandidate', this.handleIceCandidate)
        this.peerConnection.removeEventListener('track', this.handleTrack)
        this.peerConnection.removeEventListener('datachannel', this.handleDataChannel)
        this.peerConnection.close()

        this.signaling.disconnect()
        this.remoteStreamHandler = undefined
        this.eventHandlers = {}
    }

    /** ========== FLOW LOGIC ========== */

    async sendTrainingRequest(payload: TrainingPayload): Promise<'OK' | 'BUSY'> {
        this.userId = payload.user_id
        this.sendData({ key: MessageKey.TRAINING, data: payload })

        return new Promise((resolve) => {
            this.on(MessageKey.STATUS, (status) => {
                if (status === 'OK') this.isTrainingActive = true
                resolve(status)
            })
        })
    }

    sendStartTraining(): void {
        if (!this.isTrainingActive) {
            console.warn('[WebRTC] Cannot start training, not ready')
            return
        }
        this.sendData({ key: MessageKey.REQUEST_TRAINING, data: 'START' })
    }

    sendStopTraining(): void {
        this.sendData({ key: MessageKey.REQUEST_TRAINING, data: 'STOP' })
        this.isTrainingActive = false
    }

    async sendPauseTraining(): Promise<ResponseTrainingPayload> {
        this.sendData({ key: MessageKey.REQUEST_TRAINING, data: 'PAUSE' })

        return new Promise((resolve) => {
            this.on(MessageKey.RESPONSE_TRAINING, (data) => resolve(data))
        })
    }
}

export default WebRTCService
