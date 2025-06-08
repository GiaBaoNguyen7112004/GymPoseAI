package com.pbl5.gympose.config.app;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class VietnamTimeSerializer extends JsonSerializer<LocalDateTime> {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");

    @Override
    public void serialize(LocalDateTime value, JsonGenerator gen, SerializerProvider serializers)
            throws IOException {
        // Giả định giá trị trong DB là UTC → convert sang giờ Việt Nam
        ZonedDateTime vietnamTime = value.atZone(ZoneId.of("UTC"))
                .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));

        // Chuyển lại thành LocalDateTime (đã ở múi giờ Việt Nam)
        LocalDateTime localVietnamTime = vietnamTime.toLocalDateTime();

        // Ghi ra chuỗi không có offset
        gen.writeString(localVietnamTime.format(formatter));
    }
}
