package org.migor.shared.parser;

import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:46 PM
 */
public class GenericParser {

    public static final String DEFAULT_DATE_FORMAT_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_ARRAY_DELIMITER = ",";


    private static String dateFormatPattern = GenericParser.DEFAULT_DATE_FORMAT_PATTERN;
    private static String arrayDelimiter = DEFAULT_ARRAY_DELIMITER;


    @SuppressWarnings("unchecked")
    public static <T> T parse(Class<T> clazz, String value) throws ParseException {
        try {
            if (StringUtils.isEmpty(value)) {
                return null;
            } else if (clazz.isPrimitive()) {
                if (clazz.toString().equals("float")) {
                    return (T)Float.valueOf(value);
                } else if (clazz.toString().equals("double")) {
                    return (T)Double.valueOf(value);
                } else if (clazz.toString().equals("long")) {
                    return (T)Long.valueOf(value);
                } else if (clazz.toString().equals("int")) {
                    return (T)Integer.valueOf(value);
                } else if (clazz.toString().equals("boolean")) {
                    return (T)Boolean.valueOf(value);
                }
            } else if (clazz.equals(Boolean.class)) {
                return (T)Boolean.valueOf(value);
            } else if (clazz.equals(Long.class)) {
                return (T)Long.valueOf(value);
            } else if (clazz.equals(Integer.class)) {
                return (T)Integer.valueOf(value);
            } else if (clazz.equals(Double.class)) {
                return (T)Double.valueOf(value);
            } else if (clazz.equals( Float.class )) {
                return (T)Float.valueOf(value);
            } else if (clazz.equals( Date.class )) {
                try {
                    return (T)(new SimpleDateFormat(getDateFormatPattern()).parse(value));
                } catch (Exception t) {
                    throw new RuntimeException("Failed to parse date: " + t.getMessage());
                }
            } else if (clazz.isEnum()) {
                Object[] defined_values = clazz.getEnumConstants();
                for (Object t : defined_values) {
                    if (t.toString().equalsIgnoreCase(value)) {
                        return (T)t;
                    }
                }
                throw new RuntimeException("Unable to convert: Defined value "+value+" is not an option of "+clazz.toString());
            } else if (clazz.isAssignableFrom(Parsable.class)) {
                return (T) ((Parsable) clazz.newInstance()).parse(value);
            } else if (clazz.isAssignableFrom(String.class)) {
                return (T)value;
            }

            throw new ParseException("Type can not by cast by this method: "+clazz.toString());
        } catch (ParseException e) {
            throw e;
        } catch (Exception t) {
            throw new ParseException(t.getMessage(), t);
        }
    }

    @SuppressWarnings( "unchecked" )
    public static <T> T[] parseArray(Class<T> clazz, String value) throws ParseException {
        try {
            String[] values = value.split(getArrayDelimiter());

            T[] array = (T[]) Array.newInstance(clazz, values.length);

            for (int pos = 0; pos < values.length; pos++) {
                array[pos] = parse(clazz, values[pos]);
            }
            return array;
        } catch (Exception t) {
            throw new ParseException(t.getMessage(), t);
        }
    }

    public static String getDateFormatPattern() {
        return dateFormatPattern;
    }

    public static void setDateFormatPattern( final String newDateFormatPattern ) {
        dateFormatPattern = newDateFormatPattern;
    }

    public static String getArrayDelimiter() {
        return arrayDelimiter;
    }

    public static void setArrayDelimiter( final String newArrayDelimiter ) {
        arrayDelimiter = newArrayDelimiter;
    }
}
