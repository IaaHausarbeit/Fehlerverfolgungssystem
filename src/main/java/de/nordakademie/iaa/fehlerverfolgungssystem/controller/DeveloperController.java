package de.nordakademie.iaa.fehlerverfolgungssystem.controller;

import de.nordakademie.iaa.fehlerverfolgungssystem.model.Developer;
import de.nordakademie.iaa.fehlerverfolgungssystem.service.DeveloperService;
import org.springframework.web.bind.annotation.*;

/**
 * Rest controller for the developer service.
 */
@RestController
public class DeveloperController {
    private DeveloperService developerService;

    /**
     * Saves the given ticket.
     *
     * @param developer
     */
    @RequestMapping(value = "/saveDeveloper", method = RequestMethod.PUT)
    public void saveDeveloper(@RequestBody Developer developer) throws Exception {
        developerService.createDeveloper(developer);
    }
}
