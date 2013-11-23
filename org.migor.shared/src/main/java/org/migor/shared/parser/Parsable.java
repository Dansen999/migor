package org.migor.shared.parser;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:50 PM
 */
public interface Parsable<T> {

    public T parse(final String string) throws ParseException;
}
