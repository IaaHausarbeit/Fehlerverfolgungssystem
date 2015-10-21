package de.nordakademie.iaa.fehlerverfolgungssystem.model;

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
     * hier wird der Nickname übergeben, muss dann beim Setzen und ziehen beachtet werden, dass es gegen einen
     * validen Developer ausgetauscht wird {@see Developer}
     */
    private String creator;

    /**
     * Datum des Kommentars
     */
    private Long date;

    /**
     * Kommentartext
     */
    private String text;

    /**
     * Ticket, an dem der Kommentar geschrieben wurde
     */
    @ManyToOne
    @JoinColumn(name = "FK_TICKET")
    private Ticket ticket;


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
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
