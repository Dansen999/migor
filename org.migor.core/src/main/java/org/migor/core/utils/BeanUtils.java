package org.migor.core.utils;

import org.jetbrains.annotations.NotNull;

import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.AnnotatedType;
import javax.enterprise.inject.spi.BeanManager;
import javax.enterprise.inject.spi.InjectionTarget;
import javax.naming.InitialContext;
import javax.naming.NamingException;


/**
 * 05.07.13 15:09
 *
 * @author Daniel Scheidle
 *         daniel.scheidle@ucs.at
 *         Unique Computing Solutions GmbH
 */
public class BeanUtils {

    public static final String JNDI_BEAN_MANAGER = "java:comp/BeanManager";

    /**
     * This method does NOT work on interfaces.
     *
     * @param instanceClass the bean class.
     * @param <T>           generic type of the bean.
     * @return injected bean.
     * @throws javax.naming.NamingException if lookup for the BeanManager fails
     */
    @SuppressWarnings("unchecked")
    public static <T> T get(@NotNull final Class<T> instanceClass) throws NamingException {
        BeanManager beanManager = getBeanManager();

        AnnotatedType<Object> annotatedType = (AnnotatedType<Object>) beanManager.createAnnotatedType(instanceClass);
        InjectionTarget<Object> injectionTarget = beanManager.createInjectionTarget(annotatedType);
        CreationalContext<Object> context = beanManager.createCreationalContext(null);
        Object instance = injectionTarget.produce(context);
        injectionTarget.inject(instance, context);
        injectionTarget.postConstruct(instance);

        return (T) instance;
    }

    /**
     * @return BeanManager
     * @throws javax.naming.NamingException
     */
    @NotNull
    public static BeanManager getBeanManager() throws NamingException {
        return InitialContext.doLookup(JNDI_BEAN_MANAGER);
    }
}


