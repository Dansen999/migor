package org.migor.service;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * @author Daniel Scheidle
 * @since 11/23/13 3:35 PM
 */
@Path("/ping")
public class PingService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response ping() {
        return Response.ok();
    }
}
