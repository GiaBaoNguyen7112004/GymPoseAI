package com.pbl5.gympose.payload.general;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.pbl5.gympose.utils.CommonConstant;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseData {

    String status;

    Object data;

    Object errors;

    Object meta;

    String message;

    public static ResponseData successWithMeta(Object data, Object meta, String message) {
        return ResponseData.builder().status(CommonConstant.SUCCESS).data(data).meta(meta).message(message).build();
    }

    public static ResponseData success(Object data, String message) {
        return ResponseData.builder().status(CommonConstant.SUCCESS).data(data).message(message).build();
    }

    public static ResponseData successWithoutMetaAndData(String message) {
        return ResponseData.builder().status(CommonConstant.SUCCESS).message(message).build();
    }

    public static ResponseData error(Object error) {
        return ResponseData.builder().status(CommonConstant.FAILURE).errors(error).build();
    }
}