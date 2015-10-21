package de.nordakademie.iaa.fehlerverfolgungssystem.dao;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Developer;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * DAO für die Entwickler
 * created by Paul
 */
public class DeveloperDAO {

    private EntityManager entityManager;

    /**
     * @return Gibt alle vorhandenen Entwickler zurück.
     */
    @SuppressWarnings(value = "unchecked")
    public List<Developer> findAll() {
        return entityManager.createQuery("select developer from Developer developer").getResultList();
    }

    /**
     * @param nickname nickname des zu suchenden Developers
     * @return Developer zum übergebenen Nicknamen
     */
    public Developer getDeveloper(String nickname) {
        return entityManager.find(Developer.class, nickname);
    }

    /**
     * speichert den übergebenen Entwickler
     * @param developer der gespeichert werden soll
     */
    public void save(Developer developer) {
        if (developer == null) {
            entityManager.persist(developer);
        } else {
            entityManager.merge(developer);
        }
    }

    /**
     * löscht den übergebenen Entwickler aus der Datenbank
     * @param developer der gelöscht werden soll
     */
    public void delete(Developer developer) {
        entityManager.remove(developer);
    }


    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
