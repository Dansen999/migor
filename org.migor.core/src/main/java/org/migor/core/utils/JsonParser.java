package org.migor.core.utils;

import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.ObjectMapper;

/**
 * @author Daniel Scheidle
 * @since 11/24/13 10:06 AM
 */
public class JsonParser {

    private JsonParser() {

    }

    public static ObjectMapper getObjectMapper() {
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        return objectMapper;
    }
}
