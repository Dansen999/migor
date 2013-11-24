package org.migor.service;

import org.codehaus.jackson.annotate.JsonProperty;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.migor.shared.StatusCode;

import java.util.Date;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:21 PM
 */
public class Response {

    @JsonProperty("status")
    public int status;

    @JsonProperty("message")
    public String message;

    @JsonProperty("timestamp")
    public Date timestamp = new Date();

    @JsonProperty("content")
    public Object content;


    protected Response(@NotNull final StatusCode status,
                       @Nullable final String message,
                       @Nullable final Object content) {
        this.status = status.getCode();
        this.message = message;
        this.content = content;
    }

    public static Response ok() {
        return new Response(StatusCode.OK, StatusCode.OK.getMessage(), null);
    }

    public static Response ok(@NotNull final Object content) {
        return new Response(StatusCode.OK, StatusCode.OK.getMessage(), content);
    }

    public static Response error(@NotNull final String message) {
        return new Response(StatusCode.ERROR, message, null);
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public Object getContent() {
        return content;
    }
}
