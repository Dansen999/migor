package org.migor.service.sockets.data;

import javax.websocket.Session;

/**
 * @author Daniel Scheidle
 * @since 11/24/13 10:14 AM
 */
public class UserSession {

    private String userName;

    private Session session;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }
}
