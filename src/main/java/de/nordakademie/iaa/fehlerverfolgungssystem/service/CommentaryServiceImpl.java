package de.nordakademie.iaa.fehlerverfolgungssystem.service;

import de.nordakademie.iaa.fehlerverfolgungssystem.dao.CommentaryDAO;
import de.nordakademie.iaa.fehlerverfolgungssystem.model.Commentary;
import org.hibernate.exception.ConstraintViolationException;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Paul on 23.10.2015.
 */
public class CommentaryServiceImpl implements CommentaryService {
    private CommentaryDAO commentaryDAO;

    @Inject
    public void setCommentaryDAO(CommentaryDAO commentaryDAO) {
        this.commentaryDAO=commentaryDAO;
    }

    @Override
    public void createCommentary(Commentary commentary) throws EntityAlreadyPresentException {
        try {
            commentaryDAO.save(commentary);
        } catch (ConstraintViolationException e) {
            throw new EntityAlreadyPresentException();
        }
    }

    @Override
    public List<Commentary> listCommentaries() {
        return commentaryDAO.findAll();
    }

    @Override
    public Commentary getCommentary(Long id) {
        return commentaryDAO.getSingleCommentary(id);
    }

    @Override
    public void deleteCommentary(Commentary commentary) {
        commentaryDAO.delete(commentary);
    }


}
