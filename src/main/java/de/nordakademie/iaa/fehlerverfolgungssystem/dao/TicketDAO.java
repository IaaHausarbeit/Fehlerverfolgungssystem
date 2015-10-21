package de.nordakademie.iaa.fehlerverfolgungssystem.dao;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Ticket;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * DAO-Klasse für die Tickets
 * created by Paul
 */
public class TicketDAO {
    private EntityManager entityManager;

    /**
     * @return Gibt alle vorhandenen Entwickler zurück.
     */
    @SuppressWarnings(value = "unchecked")
    public List<Ticket> findAll() {
        return entityManager.createQuery("select ticket from Ticket ticket").getResultList();
    }

    /**
     * @param id des Tickets, welches zurückgegeben werden soll
     * @return Ticket zu der übergebenen ID
     */
    public Ticket getTicket(Long id) {
        //TODO Kommentare noch hinzufügen
        return entityManager.find(Ticket.class, id);
    }

    /**
     * Speichert übergebenes  Ticket
     *
     * @param ticket welches in die Datenbank gespeichert werden soll
     */
    public void save(Ticket ticket) {
        if (ticket == null) {
            entityManager.persist(ticket);
        } else {
            entityManager.merge(ticket);
        }
    }

    /**
     * Löscht übergebenes Ticket aus der Datenbank
     * @param ticket welches gelöscht werden soll
     */
    public void delete(Ticket ticket) {
        entityManager.remove(ticket);
    }


    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
