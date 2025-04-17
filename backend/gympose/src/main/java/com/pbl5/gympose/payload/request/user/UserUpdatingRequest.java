package com.pbl5.gympose.payload.request.user;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pbl5.gympose.enums.Gender;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Getter
@Setter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdatingRequest {
    String firstName;
    String lastName;
    Gender gender;
    Double height;
    Double weight;
    String avatar;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dateOfBirth;
}
