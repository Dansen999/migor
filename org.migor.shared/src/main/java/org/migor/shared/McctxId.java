package org.migor.shared;

import com.eaio.uuid.UUID;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import java.net.InetAddress;
import java.util.Date;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 10:24 PM
 */
@SuppressWarnings("UnusedDeclaration")
public class McctxId {

    private static final Logger logger = Logger.getLogger(McctxId.class);

    private static final String ENV_KEY_BIND_ADDRESS = "jboss.bind.address";

    private static final long MAX_HEADER_LEN = 2048;

    private McctxId() {
        // util class, no constructor needed
    }

    /**
     * Gets bind address.
     *
     * @return the bind address
     */
    @NotNull
    public static String getBindAddress() {
        String ip = System.getProperty(ENV_KEY_BIND_ADDRESS);
        try {
            return StringUtils.isBlank(ip) ? InetAddress.getLocalHost().getHostName() : ip;
        } catch (Exception e) {
            return "localhost";
        }
    }


    /**
     * Add UUID to thread name.
     *
     * @param u the u
     */
    public static void addUUIDToThreadName(@NotNull final String u) {
        Thread thread = Thread.currentThread();

        if (StringUtils.indexOf(thread.getName(), "|") != -1) {
            removeUUIDFromThreadName();
        }

        thread.setName(thread.getName() +"|"+ u);
    }

    /**
     * Remove UUID from thread name.
     */
    public static void removeUUIDFromThreadName() {
        final Thread temp = Thread.currentThread();
        final String currentName = temp.getName();
        temp.setName(currentName.substring(0, currentName.length()-37));
    }


    /**
     * Create uUID.
     *
     * @return the uUID
     */
    @NotNull
    public static String create() {
        return new UUID().toString();
    }


    /**
     * Create UUID.
     *
     * @param currentUUID the current uUID
     * @return the uUID
     */
    @NotNull
    public static UUID create(@Nullable final String currentUUID) {
        if (!StringUtils.isBlank(currentUUID)) {
            return new UUID(currentUUID);
        } else {
            return new UUID();
        }
    }

    /**
     * Create path.
     *
     * @return the string
     */
    @NotNull
    public static String createPath() {
        return addPath(null);
    }

    /**
     * Add path.
     *
     * @param currentPath the current path
     * @return the string
     */
    @NotNull
    public static String addPath(@Nullable final String currentPath) {

        String path = "";
        if (!StringUtils.isBlank(currentPath)) {
            path += StringUtils.trim(currentPath) + ";";
        }

        path += getBindAddress() + "," + new Date().getTime();
        try {
            while (path.length() > MAX_HEADER_LEN) {
                path = StringUtils.substring(path, path.indexOf(";") + 1, path.length()-1);

                if (logger.isDebugEnabled())
                    logger.debug("Host removed - new path: " + path);
            }
        } catch (Exception e) {
            logger.warn("Given path could not be shortened due to incorrect formatting");
            path = path + "," + new Date().getTime();
        }
        return path;
    }


}
