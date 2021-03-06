package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Set;

/**
 * Entitäts-Klasse für ein Ticket
 * createy by Paul
 */
@Entity
public class Ticket implements Serializable {
    private static final long serialVersionUID = 7527894993588241766L;
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
    private String creator;

    /**
     * Bearbeitender Entwickler
     */
    private String currentWorker;


    /**
     * Erstellungsdatum
     */
    private Date createDateTimestamp = new Date();

    /**
     * Bearbeitungsdatum
     */
    private Date changeDateTimestamp;

    /**
     * Titel des Tickets (Kurzüberschrift)
     */
    private String titel;

    /**
     * Beschreibung des Tickets (ausführliche Beschreibung des Fehlers)
     */
    private String description;

    /**
     * Liste aller Kommentare am Ticket
     */

    private List<Commentary> commentaryList;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinColumn(name = "ticket_id")
    public List<Commentary> getCommentaryList() {
        return commentaryList;
    }

    public void setCommentaryList(List<Commentary> commentaryList) {
        this.commentaryList = commentaryList;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ticket_id")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    @Column
    public Date getChangeDateTimestamp() {
        return changeDateTimestamp;
    }

    public void setChangeDateTimestamp(Date changeDateTimestamp) {
        this.changeDateTimestamp = changeDateTimestamp;
    }

    @Column(nullable = false)
    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    @Column(columnDefinition = "NVARCHAR(MAX)")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Column(nullable = false)
    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    @Column
    public String getCurrentWorker() {
        return currentWorker;
    }

    public void setCurrentWorker(String currentWorker) {
        this.currentWorker = currentWorker;
    }

    @Column
    public Date getCreateDateTimestamp() {
        return createDateTimestamp;
    }

    public void setCreateDateTimestamp(Date createDateTimestamp) {
        this.createDateTimestamp = createDateTimestamp;
    }

}

