package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import org.aspectj.lang.annotation.control.CodeGenerationHint;

import javax.persistence.*;

/**
 * Klasse für Kommentare an einem Ticket
 */
@Entity
public class Commentary {
    //TODO serializable generieren
    private Long id;

    /**
     * Verfasser des Kommentars
     */
    private Developer creator;

    /**
     * Datum des Kommentars
     */
    private Long date;

    /**
     * Kommentartext
     */
    private String text;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false)
    public Developer getCreator() {
        return creator;
    }

    public void setCreator(Developer creator) {
        this.creator = creator;
    }

    @Column(nullable = false)
    public Long getDate() {
        return date;
    }

    public void setDate(Long date) {
        this.date = date;
    }

    @Column(nullable = false)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
