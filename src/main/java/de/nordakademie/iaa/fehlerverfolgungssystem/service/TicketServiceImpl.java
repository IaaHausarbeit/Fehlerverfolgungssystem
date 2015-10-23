package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.dao.TicketDAO;
import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;
import org.hibernate.exception.ConstraintViolationException;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public class TicketServiceImpl implements TicketService {

    private TicketDAO ticketDAO;

    @Inject
    public void setTicketDAO(TicketDAO ticketDAO) {
        this.ticketDAO = ticketDAO;
    }

    @Override
    public void saveTicket(Ticket ticket) throws EntityAlreadyPresentException {
        try {
            ticketDAO.save(ticket);
        } catch (ConstraintViolationException e) {
            throw new EntityAlreadyPresentException();
        }
    }

    @Override
    public List<Ticket> listTickets() {
        return ticketDAO.findAll();
    }

    @Override
    public Ticket editTicket(Long id) {
        return ticketDAO.getTicket(id);
    }
}
