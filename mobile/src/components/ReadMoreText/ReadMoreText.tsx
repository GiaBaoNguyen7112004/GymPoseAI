import React, { useState, useEffect, useCallback } from 'react'
import { Text, StyleProp, TextStyle, NativeSyntheticEvent, TextLayoutEventData, View } from 'react-native'
import TextGradient from '../TextGradient'

interface ReadMoreTextProps {
    text: string
    numberOfLines?: number
    textStyle?: StyleProp<TextStyle>
    readMoreStyle?: StyleProp<TextStyle>
    readMoreText?: string
    readLessText?: string
}

const ReadMoreText = ({
    text,
    numberOfLines = 3,
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

    const onTextLayout = useCallback(
        (e: NativeSyntheticEvent<TextLayoutEventData>) => {
            if (e.nativeEvent.lines.length > numberOfLines && !textShown) {
                setShowMoreButton(true)
                setNumLines(numberOfLines)
            }
        },
        [numberOfLines, textShown]
    )

    // Function để tính toán độ dài văn bản hiển thị dựa trên số dòng
    const getTruncatedText = () => {
        // Nếu không cần hiển thị nút Read More hoặc đã hiển thị toàn bộ văn bản
        if (!showMoreButton || textShown) {
            return text
        }

        // Ước tính số ký tự trung bình mỗi dòng (đơn giản hóa)
        const avgCharsPerLine = Math.floor(text.length / (text.length / 50)) // Giả định trung bình 50 ký tự/dòng

        // Ước tính vị trí cắt để chừa chỗ cho nút Read More
        const estimatedCutoff = avgCharsPerLine * numberOfLines - readMoreText.length - 3

        // Tìm vị trí khoảng trắng gần nhất để cắt văn bản một cách tự nhiên
        const lastSpacePos = text.substring(0, estimatedCutoff).lastIndexOf(' ')

        return text.substring(0, lastSpacePos > 0 ? lastSpacePos : estimatedCutoff)
    }

    return (
        <Text onTextLayout={onTextLayout} numberOfLines={numLines} style={[textStyle, { width: '100%' }]}>
            {textShown ? text : getTruncatedText()}
            {showMoreButton && (
                <Text onPress={toggleTextShown} style={readMoreStyle || textStyle}>
                    <TextGradient
                        text={textShown ? readLessText : readMoreText}
                        textStyle={readMoreStyle || textStyle}
                    />
                </Text>
            )}
        </Text>
    )
}

export default ReadMoreText
