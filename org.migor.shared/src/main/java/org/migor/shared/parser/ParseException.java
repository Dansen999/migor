package org.migor.shared.parser;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:20 PM
 */
public class ParseException extends Exception {

    public ParseException(final String message) {
        super(message);
    }

    public ParseException(final String message, final Throwable cause) {
        super(message, cause);
    }
}
