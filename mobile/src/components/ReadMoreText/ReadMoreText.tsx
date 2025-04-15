import { useState, useRef } from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleProp,
    TextStyle,
    NativeSyntheticEvent,
    TextLayoutEventData,
    StyleSheet
} from 'react-native'

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
    readLessText = 'Read Less'
}: ReadMoreTextProps) => {
    const [showMoreButton, setShowMoreButton] = useState(false)
    const [textShown, setTextShown] = useState(false)
    const [numLines, setNumLines] = useState<number | undefined>(undefined)

    const toggleTextShown = () => setTextShown((prev) => !prev)

    useEffect(() => {
        setNumLines(textShown ? undefined : numberOfLines)
    }, [textShown, numberOfLines])

    const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
        const { lines } = e.nativeEvent
        if (lines.length > numberOfLines) {
            setShouldShowReadMore(true)
        }
    }

    const toggleExpanded = () => setExpanded(!expanded)

    return (
        <View>
            <Text
                ref={textRef}
                numberOfLines={expanded ? undefined : numberOfLines}
                onTextLayout={onTextLayout}
                style={[styles.contentText, textStyle]}
            >
                {content}
            </Text>

            {shouldShowReadMore && (
                <TouchableOpacity onPress={toggleExpanded}>
                    <Text style={styles.readMoreText}>{expanded ? readLessText : readMoreText}</Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    contentText: {
        fontSize: 16,
        color: '#4A4A4A'
    },
    readMoreText: {
        color: '#8C9EFF',
        fontWeight: '600',
        marginTop: 4
    }
})

export default ReadMoreText
