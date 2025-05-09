// components/ExerciseVideoPlayer.tsx
import React, { memo } from 'react'
import { View, StyleSheet } from 'react-native'
import YoutubePlayer from 'react-native-youtube-iframe'

type Props = {
    videoId: string
}

const ExerciseVideoPlayer = ({ videoId }: Props) => {
    return (
        <View style={styles.container}>
            <YoutubePlayer height={300} videoId={videoId} />
        </View>
    )
}

export default memo(ExerciseVideoPlayer)

const styles = StyleSheet.create({
    container: {
        borderRadius: 12,
        aspectRatio: 16 / 9,
        marginBottom: 20,
        overflow: 'hidden',
        width: '100%',
        backgroundColor: '#1D1617'
    }
})
