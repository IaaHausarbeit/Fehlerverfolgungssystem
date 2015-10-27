package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Commentary;

import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public interface CommentaryService {
    /**
     * Kommentar speichern.
     * @param commentary
     * @throws EntityAlreadyPresentException
     */
    void createCommentary(Commentary commentary) throws EntityAlreadyPresentException;

    /**
     * brauchen wir eigentlich nicht, aber kann ja sein ;)
     * @return
     */
    List<Commentary> listCommentaries();

    Commentary getCommentary(Long id);

    void deleteCommentary(Commentary commentary);
}
