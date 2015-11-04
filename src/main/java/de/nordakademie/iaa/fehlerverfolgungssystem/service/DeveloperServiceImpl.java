package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.dao.DeveloperDAO;
import de.nordakademie.iaa.fehlerverfolgungssystem.model.Developer;
import org.hibernate.exception.ConstraintViolationException;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public class DeveloperServiceImpl implements DeveloperService {
    private DeveloperDAO developerDAO;

    @Inject
    public void setDeveloperDAO(DeveloperDAO developerDAO) {
        this.developerDAO=developerDAO;
    }

    @Override
    public void createDeveloper(Developer developer) throws EntityAlreadyPresentException {
        try {
            developerDAO.save(developer);
        } catch (ConstraintViolationException e) {
            throw new EntityAlreadyPresentException();
        }
    }

    @Override
    public List<Developer> listDeveloper() {
        return developerDAO.findAll();
    }

    @Override
    public Developer getDeveloper(String nickname) {
        return developerDAO.getDeveloper(nickname);
    }
}
