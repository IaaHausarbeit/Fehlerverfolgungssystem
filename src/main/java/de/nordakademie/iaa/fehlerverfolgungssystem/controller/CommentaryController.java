package de.nordakademie.iaa.fehlerverfolgungssystem.controller;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Commentary;
import de.nordakademie.iaa.fehlerverfolgungssystem.service.CommentaryService;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

/**
 * REST Controller für Kommentare.
 */
@RestController
public class CommentaryController {
    /**
     * The commentary Service.
     */
    private CommentaryService commentaryService;

    /**
     * List all commentaries.
     * @return the list of commentaries.
     */
    @RequestMapping(value = "/commentarylist", method = RequestMethod.GET)
    public List<Commentary> listCommentaries() { return commentaryService.listCommentaries(); }

    /**
     * Saves a commentary.
     * @param commentary
     */
    @RequestMapping(value = "/saveCommentary", method = RequestMethod.PUT)
    public void saveCommentary(@RequestBody Commentary commentary) throws Exception {
        commentaryService.createCommentary(commentary);
    }


    @Inject
    public void setCommentaryService(CommentaryService commentaryService){this.commentaryService=commentaryService;}

}
