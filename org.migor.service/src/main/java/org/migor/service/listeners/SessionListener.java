package org.migor.service.listeners;

import org.apache.log4j.Logger;
import org.migor.core.cache.UserSessionCache;


import javax.inject.Inject;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * @author Daniel Scheidle
 * @since 11/6/13 8:35 PM
 */
public class SessionListener implements HttpSessionListener {

    private static final Logger logger = Logger.getLogger(SessionListener.class);


    @Inject
    private UserSessionCache userSessionCache;

    @Override
    public void sessionCreated(HttpSessionEvent se) {
        if (logger.isDebugEnabled()) {
            logger.debug("Created session " + se.getSession().getId());
        }
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        if (logger.isDebugEnabled()) {
            logger.debug("Destroyed session " + se.getSession().getId());
        }

        userSessionCache.remove(se.getSession().getId());
    }
}
