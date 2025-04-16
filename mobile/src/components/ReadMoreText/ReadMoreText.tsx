import { useState, useCallback } from 'react'
import { Text, StyleProp, TextStyle, NativeSyntheticEvent, TextLayoutEventData, View, StyleSheet } from 'react-native'
import TextGradient from '../TextGradient'

interface ReadMoreTextProps {
    text: string
    numberOfLines?: number
    textStyle?: StyleProp<TextStyle>
    readMoreStyle?: StyleProp<TextStyle>
    readMoreText?: string
    readLessText?: string
    lineHeight: number
}

const ReadMoreText = ({
    text,
    numberOfLines = 1,
    textStyle,
    readMoreStyle,
    readMoreText = 'Read More...',
    readLessText = 'Read Less',
    lineHeight
}: ReadMoreTextProps) => {
    const [showMoreButton, setShowMoreButton] = useState(false)
    const [textShown, setTextShown] = useState(false)
    const [numLines, setNumLines] = useState<number | undefined>(undefined)

    const toggleTextShown = () => {
        setTextShown((prev) => !prev)
        setNumLines((prev) => (prev === numberOfLines ? undefined : numberOfLines))
    }

    const onTextLayout = useCallback(
        (e: NativeSyntheticEvent<TextLayoutEventData>) => {
            const totalLines = e.nativeEvent.lines.length
            if (totalLines > numberOfLines && !textShown) {
                setShowMoreButton(true)
                setNumLines(numberOfLines)
            }
        },
        [numberOfLines, textShown]
    )

    return (
        <View style={styles.textContainer}>
            <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={textStyle} ellipsizeMode='tail'>
                {text}
            </Text>
            {showMoreButton && (
                <Text onPress={toggleTextShown} style={[styles.readMore, { bottom: textShown ? -lineHeight : 0 }]}>
                    <TextGradient
                        text={textShown ? readLessText : readMoreText}
                        textStyle={readMoreStyle || textStyle}
                    />
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textContainer: { position: 'relative' },
    readMore: {
        position: 'absolute',
        right: 0,
        backgroundColor: '#FFF',
        paddingLeft: 10
    }
})

export default ReadMoreText
