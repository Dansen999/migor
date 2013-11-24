package org.migor.service.rest.user.in;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 7:41 PM
 */
public class UserCredentials {

    @JsonProperty("userName")
    private String userName;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public String toString() {
        return "UserCredentials{" +
                "userName='" + userName + '\'' +
                '}';
    }
}
