import { useCallback, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import WebRTCService, { WebRTCConnectionStatusCallback } from '../services/rtc/WebRTCService'
import { MediaStream } from 'react-native-webrtc'
import { MessageKey } from '@/constants/messageKey'
import {
    AIResponsePayload,
    ResponseTrainingPayload,
    StatusPayload,
    TrainingPayload
} from '@/types/payloadWithWebRTCTypes'
import useBluetoothContext from './useBluetoothContext'

interface UseWebRTCProps {
    wsSignalingUrl: string
    onRemoteStream: (stream: MediaStream) => void
    onAIResponse?: (data: AIResponsePayload) => void
    onStatusChange?: WebRTCConnectionStatusCallback
}

const useWebRTC = ({ wsSignalingUrl, onRemoteStream, onAIResponse, onStatusChange }: UseWebRTCProps) => {
    const webRTCServiceRef = useRef<WebRTCService | null>(null)
    const { reReadInfoDevice } = useBluetoothContext()

    useEffect(() => {
        const webRTCService = WebRTCService.getInstance({ wsSignalingUrl })
        webRTCServiceRef.current = webRTCService
        webRTCService.setRemoteStreamHandler(onRemoteStream)
        if (typeof onStatusChange == 'function') webRTCService.onConnectionStatusChange(onStatusChange)

        if (onAIResponse) webRTCService.on(MessageKey.AI_RESPONSE, onAIResponse)
    }, [wsSignalingUrl, onRemoteStream, onAIResponse, reReadInfoDevice])

    useFocusEffect(
        useCallback(() => {
            const start = async () => {
                await webRTCServiceRef.current?.startConnection()
            }
            start()

            return () => {
                webRTCServiceRef.current?.sendStopTraining()
                WebRTCService.destroyInstance()
            }
        }, [WebRTCService])
    )

    const sendTrainingRequest = useCallback(async (payload: TrainingPayload): Promise<StatusPayload> => {
        if (!webRTCServiceRef.current) throw new Error('WebRTC has not been initialized')
        return await webRTCServiceRef.current.sendTrainingRequest(payload)
    }, [])

    const sendStartTraining = useCallback(async (): Promise<ResponseTrainingPayload> => {
        let response: ResponseTrainingPayload
        if (!webRTCServiceRef.current) throw new Error('WebRTC has not been initialized')
        try {
            response = await webRTCServiceRef.current.sendStartTraining()
        } catch (error) {
            console.error('Error sending start training:', error)
            throw error
        }
        return response
    }, [])

    const sendStopTraining = useCallback(() => {
        webRTCServiceRef.current?.sendStopTraining()
        WebRTCService.destroyInstance()
    }, [WebRTCService])

    const sendPauseTraining = useCallback(async (): Promise<StatusPayload> => {
        if (!webRTCServiceRef.current) throw new Error('WebRTC has not been initialized')
        return await webRTCServiceRef.current.sendPauseTraining()
    }, [])
    const isWebRTConnected = webRTCServiceRef.current?.isConnected()
    return {
        sendTrainingRequest,
        sendStartTraining,
        sendStopTraining,
        sendPauseTraining,
        isWebRTConnected
    }
}

export default useWebRTC
