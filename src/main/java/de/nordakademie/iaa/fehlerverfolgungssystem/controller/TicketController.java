package de.nordakademie.iaa.fehlerverfolgungssystem.controller;

import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by Paul on 14.10.2015.
 */
@RestController
public class TicketController {
    private EntityManager entityManager;

    public static void main(String[] args) {
        System.out.println("Hallo");

    }

    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
