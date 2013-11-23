package org.migor.shared;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:24 PM
 */
public enum StatusCode {

    OK(0),
    ERROR(1),
    PERMISSION_DENIED(2);

    private int code;

    private StatusCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }
}
