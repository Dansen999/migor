package org.migor.core.models.internal;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 9:13 PM
 */
public class User {

    private String sessionId;

    private String userName;

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "User{" +
                "sessionId='" + sessionId + '\'' +
                ", userName='" + userName + '\'' +
                '}';
    }
}
