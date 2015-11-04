package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;

import java.util.List;

/**
 * Interface für den TicketService
 * Created by Paul on 23.10.2015.
 */
public interface TicketService {

    /**
     * Stores the given ticket into the database
     * @param ticket The ticket to be saved.
     * @throws EntityAlreadyPresentException
     */
    void saveTicket(Ticket ticket) throws EntityAlreadyPresentException;

    /**
     * List all tickets
     * @return a list of ticket entities. If no ticket was found an empty list is returned.
     */
    List<Ticket> listTickets();
}
