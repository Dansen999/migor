package org.migor.core.utils;

import org.jetbrains.annotations.NotNull;

import java.io.*;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

/**
 * The type Zip utils.
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
public class ZipUtils {

    private ZipUtils() {
        // utils class --> no constructor needed
    }

    /**
     * Compress byte [ ].
     *
     * @param bytes the bytes
     * @return the byte [ ]
     * @throws Exception the exception
     */
    public static byte[] compress(@NotNull final byte[] bytes) throws Exception {

        ByteArrayInputStream inputStream = null;
        ByteArrayOutputStream outputStream = null;
        try {
            inputStream = new ByteArrayInputStream(bytes);
            outputStream = new ByteArrayOutputStream();
            compress(inputStream, outputStream);
            return outputStream.toByteArray();
        }
        catch(Exception e) {
            throw new Exception(e.getMessage(), e);
        } finally {
            if (outputStream != null) outputStream.close();
            if (inputStream != null) inputStream.close();
        }
    }


    /**
     * Decompress byte [ ].
     *
     * @param bytes the bytes
     * @return the byte [ ]
     * @throws Exception the exception
     */
    public static byte[] decompress(@NotNull final byte[] bytes) throws Exception {

        ByteArrayInputStream inputStream = null;
        ByteArrayOutputStream outputStream = null;
        try {
            inputStream = new ByteArrayInputStream(bytes);
            outputStream = new ByteArrayOutputStream();
            decompress(inputStream, outputStream);
            return outputStream.toByteArray();
        }
        catch(Exception e) {
            throw new Exception(e.getMessage(), e);
        } finally {
            if (outputStream != null) outputStream.close();
            if (inputStream != null) inputStream.close();
        }
    }


    /**
     * Compress void.
     *
     * @param inputStream the input stream
     * @param outputStream the output stream
     * @throws java.io.IOException the iO exception
     */
    public static void compress(@NotNull final InputStream inputStream,
                                @NotNull final OutputStream outputStream) throws IOException {

        GZIPOutputStream gzipOutputStream = null;
        try {
            gzipOutputStream = new GZIPOutputStream(outputStream);

            int count;
            byte[] buffer = new byte[1024];
            while ((count = inputStream.read(buffer)) > 0) {
                gzipOutputStream.write(buffer, 0, count);
            }
        } finally {
            if (gzipOutputStream != null) gzipOutputStream.close();
        }

    }

    /**
     * Decompress void.
     *
     * @param inputStream the input stream
     * @param outputStream the output stream
     * @throws java.io.IOException the iO exception
     */
    public static void decompress(@NotNull final InputStream inputStream,
                                  @NotNull final OutputStream outputStream) throws IOException {

        GZIPInputStream gzipInputStream = null;
        try {
            gzipInputStream = new GZIPInputStream(inputStream);

            int count;
            byte[] buffer = new byte[1024];
            while ((count = gzipInputStream.read(buffer)) > 0) {
                outputStream.write(buffer, 0, count);
            }
        } finally {
            if (gzipInputStream != null) gzipInputStream.close();
        }

    }
}
