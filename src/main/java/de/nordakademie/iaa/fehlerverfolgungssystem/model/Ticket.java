package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * Entitäts-Klasse für ein Ticket
 */
@Entity
public class Ticket implements Serializable {
    //TODO serializable generieren

    /**
     * ID des Tickets
     */
    private Long id;

    /**
     * Status des Tickets
     */
    private Status status;

    /**
     * Autor des Tickets
     */
    private Developer creator;

    /**
     * Bearbeitender Entwickler
     */
    private Developer currentWorker;

    /**
     * Erstellungsdatum
     */
    private Long createDateTimestamp;

    /**
     * Bearbeitungsdatum
     */
    private Long changeDateTimestamp;

    /**
     * Titel des Tickets (Kurzüberschrift)
     */
    private String titel;

    /**
     * Beschreibung des Tickets (ausführliche Beschreibung des Fehlers)
     */
    private String description;

/*    *//**
     * Liste aller Kommentare am Ticket --> durch onetomany ohne Liste realisieren
     *//*
    private List<Commentary> commentaryList;*/

    /**
     * Kommentar
     */
    private Commentary commentary;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false)
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

/*    @Column(nullable = false)
    public Developer getCreator() {
        return creator;
    }

    public void setCreator(Developer creator) {
        this.creator = creator;
    }*/
/*
    @Column
    public Developer getCurrentWorker() {
        return currentWorker;
    }

    public void setCurrentWorker(Developer currentWorker) {
        this.currentWorker = currentWorker;
    }*/

    @Column(nullable = false)
    public Long getChangeDateTimestamp() {
        return changeDateTimestamp;
    }

    public void setChangeDateTimestamp(Long changeDateTimestamp){
        this.changeDateTimestamp = changeDateTimestamp;
    }

    @Column(nullable = false)
    public Long getCreateDateTimestamp() {
        return createDateTimestamp;
    }

    public void setCreateDateTimestamp(Long createDateTimestamp) {
        this.createDateTimestamp = createDateTimestamp;
    }

    @Column(nullable = false)
    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    @Column
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



/*  durch OneToMany realisieren --> keine Liste nötig

    public List<Commentary> getCommentaryList() {
        //TODO Kommentare beziehen
        return commentaryList;
    }

    public void setCommentaryList(List<Commentary> commentaryList) {
        //TODO Kommentare hinzufügen
        this.commentaryList = commentaryList;
    }
*/


    @OneToMany
    public Commentary getCommentary() {
        return commentary;
    }

    public void setCommentary(Commentary commentary) {
        this.commentary = commentary;
    }

    @OneToOne(optional = false)
    public Developer getCreator() {
        return creator;
    }

    public void setCreator(Developer creator) {
        this.creator = creator;
    }

    @OneToOne(optional = true)
    public Developer getCurrentWorker() {
        return currentWorker;
    }

    public void setCurrentWorker(Developer currentWorker) {
        this.currentWorker = currentWorker;
    }
}

