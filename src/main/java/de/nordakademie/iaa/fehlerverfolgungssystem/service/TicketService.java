package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;

import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public interface TicketService {

    /**
     * Stores the given ticket into the database
     * @param ticket The ticket to be saved.
     */
    void saveTicket(Ticket ticket) throws EntityAlreadyPresentException; //wann wird die geworfen und warum?

    /**
     * List all tickets
     * @return a list of ticket entities. If no ticket was found an empty list is returned.
     */
    List<Ticket> listTickets();

    /**
     * Returns the room identified by the given id.
     * @param id the identifier.
     * @return the found entity or {@code null} if no entity was found with given id.
     */
    Ticket editTicket(Long id);

}
