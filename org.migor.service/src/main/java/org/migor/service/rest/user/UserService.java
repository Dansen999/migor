package org.migor.service.rest.user;

import org.apache.log4j.Logger;
import org.migor.core.cache.UserSessionCache;
import org.migor.core.models.internal.User;
import org.migor.service.Response;
import org.migor.service.rest.user.in.UserCredentials;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


/**
 * @author Daniel Scheidle
 * @since 11/23/13 7:40 PM
 */
@Path("/private/user")
public class UserService {

    private static final Logger logger = Logger.getLogger(UserService.class);

    @Inject
    private UserSessionCache userSessionCache;

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@Context HttpServletRequest httpServletRequest, final UserCredentials credentials) {


        User user = new User();
        user.setSessionId(httpServletRequest.getSession().getId());
        user.setUserName(credentials.getUserName());

        logger.info("Adding user " + user);

        userSessionCache.add(user);

        return Response.ok();
    }
}
