import { useCallback, useEffect, useRef } from 'react'
import WebRTCService from '../services/rtc/WebRTCService'
import { MediaStream } from 'react-native-webrtc'

interface UseWebRTCProps {
    wsSignalingUrl: string
    onRemoteStream: (stream: MediaStream) => void
}

const useWebRTC = ({ wsSignalingUrl, onRemoteStream }: UseWebRTCProps) => {
    const webRTCServiceRef = useRef<WebRTCService | null>(null)

    const startConnection = useCallback(async () => {
        if (webRTCServiceRef.current) {
            await webRTCServiceRef.current.startConnection()
        }
    }, [])

    const stopConnection = useCallback(() => {
        if (webRTCServiceRef.current) {
            webRTCServiceRef.current.closeConnection()
        }
    }, [])

    useEffect(() => {
        const webRTCService = new WebRTCService({ wsSignalingUrl })
        webRTCServiceRef.current = webRTCService

        webRTCService.setRemoteStreamHandler(onRemoteStream)
    }, [])

    return { startConnection, stopConnection }
}

export default useWebRTC
