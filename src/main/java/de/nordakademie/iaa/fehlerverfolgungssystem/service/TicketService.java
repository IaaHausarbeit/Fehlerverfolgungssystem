package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;

import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public interface TicketService {

    void saveTicket(Ticket ticket) throws EntityAlreadyPresentException;

    List<Ticket> listTickets();

    Ticket editTicket(Long id);
}
