package org.migor.service.sockets;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 5:00 PM
 */
@ServerEndpoint("/socket/echo")
public class EchoSocket {

    private static final Logger logger = Logger.getLogger(EchoSocket.class);


    @OnOpen
    public void onConnectionOpen(Session session) {
        logger.info("Connection opened ... " + session.getId());
    }

    @OnMessage
    public String onMessage(String message) {
        if (StringUtils.isBlank(message)) {
            return "Please send message";
        }
        return message;
    }

    @OnClose
    public void onConnectionClose(Session session) {
        logger.info("Connection close .... " + session.getId());
    }

}
