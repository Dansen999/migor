package org.migor.core.cache;

import org.migor.core.models.internal.User;

import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 9:14 PM
 */
@Startup
@Singleton
public class UserSessionCache {

    private Map<String, User> userMap = new HashMap<String, User>();

    public void add(User user) {
        userMap.put(user.getSessionId(), user);
    }

    public User get(String sessionId) {
        return userMap.get(sessionId);
    }

    public void remove(String sessionId) {
        userMap.remove(sessionId);
    }
}