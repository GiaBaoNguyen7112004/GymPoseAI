import { useCallback, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import WebRTCService from '../services/rtc/WebRTCService'
import { MediaStream } from 'react-native-webrtc'
import { MessageKey } from '@/constants/messageKey'
import { AIResponsePayload, TrainingPayload } from '@/types/payloadWithWebRTCTypes'
import useBluetoothContext from './useBluetoothContext'

interface UseWebRTCProps {
    wsSignalingUrl: string
    onRemoteStream: (stream: MediaStream) => void
    onAIResponse?: (data: AIResponsePayload) => void
}

const useWebRTC = ({ wsSignalingUrl, onRemoteStream, onAIResponse }: UseWebRTCProps) => {
    const webRTCServiceRef = useRef<WebRTCService | null>(null)
    const { reReadInfoDevice } = useBluetoothContext()

    useEffect(() => {
        const webRTCService = WebRTCService.getInstance({ wsSignalingUrl })
        webRTCServiceRef.current = webRTCService
        webRTCService.setRemoteStreamHandler(onRemoteStream)
        webRTCService.onSignalingError((error) => {
            // reReadInfoDevice()
        })

        if (onAIResponse) {
            webRTCService.on(MessageKey.AI_RESPONSE, onAIResponse)
        }
    }, [wsSignalingUrl, onRemoteStream, onAIResponse, reReadInfoDevice])

    useFocusEffect(
        useCallback(() => {
            const start = async () => {
                await webRTCServiceRef.current?.startConnection()
            }

            start()

            return () => {
                webRTCServiceRef.current?.closeConnection()
            }
        }, [])
    )

    const sendTrainingRequest = useCallback(async (payload: TrainingPayload): Promise<'OK' | 'BUSY'> => {
        if (!webRTCServiceRef.current) throw new Error('WebRTC has not been initialized')
        return await webRTCServiceRef.current.sendTrainingRequest(payload)
    }, [])

    const sendStartTraining = useCallback(() => {
        webRTCServiceRef.current?.sendStartTraining()
    }, [])

    const sendStopTraining = useCallback(() => {
        webRTCServiceRef.current?.sendStopTraining()
    }, [])

    const sendPauseTraining = useCallback(async (): Promise<{ workout_summary_id: string }> => {
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
