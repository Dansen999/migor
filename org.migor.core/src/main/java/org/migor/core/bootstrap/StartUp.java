package org.migor.core.bootstrap;

import org.apache.log4j.Logger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.Singleton;
import javax.ejb.Startup;

/**
 * @author Daniel Scheidle
 * @since 11/4/13 11:22 PM
 */
@SuppressWarnings("UnusedDeclaration")
@Startup
@Singleton
public class StartUp {

    private static final Logger logger = Logger.getLogger(StartUp.class);

    @PostConstruct
    public void postConstruct() {
        logger.info("Started");
    }

    @PreDestroy
    public void preDestroy() {
        logger.info("Destroyed");
    }
}
