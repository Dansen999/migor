package org.migor.core;

import org.migor.shared.StatusCode;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 11:03 PM
 */
public class MigorException extends Exception {

    private StatusCode status = StatusCode.ERROR;

    public MigorException(String message, Throwable cause, StatusCode status) {
        super(message, cause);
        this.status = status;
    }

    public MigorException(String message, StatusCode status) {
        super(message);
        this.status = status;
    }

    public StatusCode getStatus() {
        return status;
    }
}
