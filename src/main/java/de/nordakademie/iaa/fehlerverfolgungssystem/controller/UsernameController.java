package de.nordakademie.iaa.fehlerverfolgungssystem.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Gibt lediglich den Username für die Oberfäche zurück
 *
 * created by Paul
 *
 * from http://www.dineshonjava.com/2013/02/spring-security-fetch-logged-in-username.html
 */
@RestController
public class UsernameController {

    @RequestMapping(value="/getUserName", method = RequestMethod.GET)
    public String printUser() {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return user.getUsername();

    }
}
