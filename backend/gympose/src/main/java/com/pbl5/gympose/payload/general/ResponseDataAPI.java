package com.pbl5.gympose.payload.general;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pbl5.gympose.util.CommonConstant;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseDataAPI {

    String status;

    Object data;

    Object error;

    Object meta;

    String message;

    public static ResponseDataAPI successWithMeta(Object data, Object meta, String message) {
        return ResponseDataAPI.builder().status(CommonConstant.SUCCESS).data(data).meta(meta).message(message).build();
    }

    public static ResponseDataAPI success(Object data, String message) {
        return ResponseDataAPI.builder().status(CommonConstant.SUCCESS).data(data).message(message).build();
    }

    public static ResponseDataAPI successWithoutMetaAndData(String message) {
        return ResponseDataAPI.builder().status(CommonConstant.SUCCESS).message(message).build();
    }

    public static ResponseDataAPI error(Object error) {
        return ResponseDataAPI.builder().status(CommonConstant.FAILURE).error(error).build();
    }
}