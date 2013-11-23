package org.migor.service.configuration;

import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;

import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.ContextResolver;
import javax.ws.rs.ext.Provider;
import java.text.SimpleDateFormat;

/**
 * @author Daniel Scheidle
 * @since 11/7/13 8:15 PM
 */
@Provider
@Produces(MediaType.APPLICATION_JSON)
public class JsonConfiguration implements ContextResolver<ObjectMapper>
{
    private final ObjectMapper objectMapper;


    public JsonConfiguration() throws Exception
    {
        this.objectMapper = new ObjectMapper();

        this.objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ"));
        this.objectMapper.configure(SerializationConfig.Feature.WRITE_DATES_AS_TIMESTAMPS, false);
    }


    public ObjectMapper getContext(Class<?> objectType)
    {
        return objectMapper;
    }
}
