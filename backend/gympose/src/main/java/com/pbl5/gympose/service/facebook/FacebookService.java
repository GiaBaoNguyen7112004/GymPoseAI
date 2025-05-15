package com.pbl5.gympose.service.facebook;


import com.pbl5.gympose.exception.UnauthenticatedException;
import com.pbl5.gympose.utils.LogUtils;
import com.pbl5.gympose.utils.exception.ErrorMessage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FacebookService {
    private static final String GET_INFO_URL = "https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=";

    public Map<String, Object> getUserInfo(final String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(GET_INFO_URL + accessToken, Map.class);
        } catch (HttpClientErrorException e) {
            LogUtils.error("ERROR - Login with facebook");
            throw new UnauthenticatedException(ErrorMessage.FACEBOOK_UNAUTHENTICATED);
        }
    }
}
