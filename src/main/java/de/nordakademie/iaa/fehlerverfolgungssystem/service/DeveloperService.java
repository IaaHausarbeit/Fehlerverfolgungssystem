package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Developer;

import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public interface DeveloperService {
    void createDeveloper(Developer developer) throws EntityAlreadyPresentException;

    /**
     * brauchen wir eigentlich nicht, aber kann ja sein ;)
     * @return
     */
    List<Developer> listTickets();

    Developer getDeveloper(String id);

}
