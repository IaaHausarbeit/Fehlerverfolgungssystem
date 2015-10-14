package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Klasse für einen Entwickler
 */
public class Developer {
    /**
     * Mitarbeiternummer
     */
    private Long id;

    /**
     * Name des Enwticklers
     */
    private String name;

    /**
     * Nickname des Entwicklers
     */
    private String nickname;

    /**
     * E-Mail-Adresse des Entwicklers
     */
    private String eMailAddress;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(nullable = false)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(nullable = false)
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    @Column(nullable = false)
    public String geteMailAddress() {
        return eMailAddress;
    }

    public void seteMailAddress(String eMailAddress) {
        this.eMailAddress = eMailAddress;
    }
}
