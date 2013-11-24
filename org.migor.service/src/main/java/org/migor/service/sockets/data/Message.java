package org.migor.service.sockets.data;

import org.codehaus.jackson.annotate.JsonProperty;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 5:33 PM
 */
public class Message {

    public static final String FIELD_SENDER_NAME = "senderName";
    public static final String FIELD_MESSAGE = "message";

    @JsonProperty("type")
    private Type type;

    @JsonProperty("content")
    private Map<String, String> content = new HashMap<String, String>();


    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Map<String, String> getContent() {
        return content;
    }

    public void setContent(Map<String, String> content) {
        this.content = content;
    }
}
