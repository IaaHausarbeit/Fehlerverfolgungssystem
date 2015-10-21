package de.nordakademie.iaa.fehlerverfolgungssystem.dao;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Commentary;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created by Paul on 21.10.2015.
 */
public class CommentaryDAO {
    private EntityManager entityManager;

    /**
     * @return Gibt alle vorhandenen Entwickler zurück.
     */
    @SuppressWarnings(value = "unchecked")
    public List<Commentary> findAll() {
        return entityManager.createQuery("select commentary from Commentary commentary").getResultList();
    }

    /**
     * @param id des Kommentares, welches zurückgegeben werden soll
     * @return Kommentar zu der übergebenen ID
     */
    public Commentary getSingleCommentary(Long id) {
        return entityManager.find(Commentary.class, id);
    }



    /**
     * Speichert übergebene Kommentar
     *
     * @param commentary welches in die Datenbank gespeichert werden soll
     */
    public void save(Commentary commentary) {
        if (commentary == null) {
            entityManager.persist(commentary);
        } else {
            entityManager.merge(commentary);
        }
    }

    /**
     * Löscht übergebenes Commentary aus der Datenbank
     * @param commentary welches gelöscht werden soll
     */
    public void delete(Commentary commentary) {
        entityManager.remove(commentary);
    }


    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
}
