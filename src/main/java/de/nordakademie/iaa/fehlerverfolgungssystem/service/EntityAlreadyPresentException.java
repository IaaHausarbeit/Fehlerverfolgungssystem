package de.nordakademie.iaa.fehlerverfolgungssystem.service;

/**
 * Wird geworfen, wenn eine Entität bereits in der DB besteht
 * Created by Paul on 23.10.2015.
 */
public class EntityAlreadyPresentException extends Exception {

    /**
     * Serial version uid.
     */
    private static final long serialVersionUID = 1L;

    /**
     * Default constructor.
     */
    public EntityAlreadyPresentException() {
        super();
    }

    /**
     * Constructor with message.
     *
     * @param message The message.
     */
    public EntityAlreadyPresentException(String message) {
        super(message);
    }
}
