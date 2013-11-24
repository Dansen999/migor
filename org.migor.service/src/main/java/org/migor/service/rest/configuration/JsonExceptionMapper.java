package org.migor.service.rest.configuration;

import org.apache.log4j.Logger;
import org.migor.core.MigorException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 * @author Daniel Scheidle, daniel.scheidle@ucs.at
 *         15:49, 09.07.12
 */
@Provider
public class JsonExceptionMapper implements ExceptionMapper<Throwable> {

    private static final Logger logger = Logger.getLogger(JsonExceptionMapper.class);

    @Override
    public Response toResponse(Throwable throwable) {

        if (throwable instanceof MigorException) {
            logger.error(throwable.getMessage(), throwable);
        } else {
            logger.fatal(throwable.getMessage(), throwable);
        }

        return Response.serverError().build();
    }


}

