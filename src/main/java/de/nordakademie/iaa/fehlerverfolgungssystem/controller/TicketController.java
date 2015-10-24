package de.nordakademie.iaa.fehlerverfolgungssystem.controller;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;
import de.nordakademie.iaa.fehlerverfolgungssystem.service.TicketService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for the ticket service.
 */
@RestController
public class TicketController {

    /**
     * The ticket service.
     */
    private TicketService ticketService;

    /**
     * List all existing rooms.
     * @return the list of rooms.
     */
    @RequestMapping(value = "/ticket/ticketlist", method = RequestMethod.GET)
    public List<Ticket> listTickets() { return ticketService.listTickets(); }

    /**
     * Saves the given ticket.
     *
     * @param ticket The ticket to be saved.
     */
    @RequestMapping(value = "ticket/editScreen", method = RequestMethod.PUT)
    public void saveTicket(@RequestBody Ticket ticket) throws Exception {
        ticketService.saveTicket(ticket);
    }

    //detlete brauchen wir nicht

    public void setTicketService(TicketService ticketService) {
        this.ticketService = ticketService;
    }



}
