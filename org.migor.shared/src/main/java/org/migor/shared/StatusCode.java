package org.migor.shared;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:24 PM
 */
public enum StatusCode {

    OK(0, "ok"),
    ERROR(1, "error"),
    PERMISSION_DENIED(2, "permission denied");

    private int code;
    private String message;

    private StatusCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
