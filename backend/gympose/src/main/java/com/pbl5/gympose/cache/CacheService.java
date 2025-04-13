package com.pbl5.gympose.cache;

import java.util.concurrent.TimeUnit;

public interface CacheService {
    void set(String key, Object value, long timeout, TimeUnit unit);

    void set(String key, Object value);

    Object get(String key);

    void delete(String key);

    boolean hasKey(String key);
}
