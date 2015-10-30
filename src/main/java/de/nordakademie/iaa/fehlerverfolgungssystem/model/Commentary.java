package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * Klasse für Kommentare an einem Ticket
 */
@Entity
public class Commentary implements Serializable{
    private static final long serialVersionUID = 5765278839783831981L;
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
    private Date date = new Date();

    /**
     * Kommentartext
     */
    private String text;

    /**
     * Ticket, an dem der Kommentar geschrieben wurde
     */

    private Ticket ticket;

    @JoinColumn(name = "TICKET_ID")
    @JsonIgnore //This way you will no longer have a Json serializing-time circular dependency.
    // https://stackoverflow.com/questions/26657259/hibernate-and-json-is-there-a-definitive-solution-to-circular-dependencies
    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

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
    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    @Column(nullable = false)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Commentary that = (Commentary) o;

        return !(getId() != null ? !getId().equals(that.getId()) : that.getId() != null);

    }

    @Override
    public int hashCode() {
        return getId() != null ? getId().hashCode() : 0;
    }
}
