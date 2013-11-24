package org.migor.service.sockets;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.migor.core.utils.JsonParser;
import org.migor.service.sockets.data.Message;
import org.migor.service.sockets.data.Type;
import org.migor.service.sockets.data.UserSession;


import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 5:00 PM
 */
@ServerEndpoint("/socket/chat/global")
public class GlobalChatSocket {

    private static final Logger logger = Logger.getLogger(GlobalChatSocket.class);


    private static Map<String, UserSession> userSessionMap = new HashMap<String, UserSession>();

    @OnOpen
    public void onConnectionOpen(final Session session) {
        logger.info("Connection opened for " + session.getId());

        try {
            session.getBasicRemote().sendText("");
        } catch (IOException e) {
            logger.warn("Couldn't deliver message to " + session.getId() + ": " + e.getMessage(), e);
        }

    }

    @OnMessage
    public void onMessage(final Session session, final String message) {
        try {
            final Message m = JsonParser.getObjectMapper().readValue(message, Message.class);

            switch (m.getType()) {
                case LOGIN:
                    UserSession userSession= new UserSession();
                    userSession.setUserName(m.getContent().get(Message.FIELD_SENDER_NAME));
                    userSession.setSession(session);
                    userSessionMap.put(session.getId(), userSession);

                    Message loginMessage = new Message();
                    loginMessage.setType(Type.LOGIN);
                    loginMessage.getContent().put(Message.FIELD_MESSAGE, "OK");
                    _send(session, loginMessage);

                    Message enteredMessage = new Message();
                    enteredMessage.setType(Type.SERVER);
                    enteredMessage.getContent().put(Message.FIELD_MESSAGE, userSession.getUserName() + " entered the room.");
                    _sendAll(session, enteredMessage, session.getId());
                    break;
                case MSG:
                    _sendAll(session, m, session.getId());
                    break;
                case TOPIC:
                    Message welcomeMessage = new Message();
                    welcomeMessage.setType(Type.TOPIC);
                    welcomeMessage.getContent().put(Message.FIELD_MESSAGE, "Welcome to Migor Chat. At the moment there are " + userSessionMap.size() + " users in this room.");
                    _send(session, welcomeMessage);
                    break;
            }

        } catch (Exception e) {
            logger.warn("Couldn't read message for " + session.getId() + ": " + e.getMessage(), e);
        }

    }

    private void _send(final Session session, final Message message) {
        try {
            if (session.isOpen()) {
                session.getBasicRemote().sendText(JsonParser.getObjectMapper().writeValueAsString(message));
            }
        } catch (IOException e) {
            logger.warn("Couldn't deliver message from " + session.getId() + ": " + e.getMessage(), e);
        }
    }

    private void _sendAll(final Session session, final Message message, final String except) {
        for (Session s : session.getOpenSessions()) {
            if (!StringUtils.equals(except, s.getId())) {
                _send(s, message);
            }
        }
    }

    @OnClose
    public void onConnectionClose(final Session session) {
        logger.info("Connection closed for " + session.getId());

        Message enteredMessage = new Message();
        enteredMessage.setType(Type.SERVER);
        enteredMessage.getContent().put(Message.FIELD_MESSAGE, userSessionMap.get(session.getId()).getUserName() + " left the room.");
        _sendAll(session, enteredMessage, session.getId());

        userSessionMap.remove(session.getId());
    }

}
