package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import javax.persistence.Column;
import java.io.Serializable;

/**
 * Klasse für einen Entwickler
 */
public class Developer implements Serializable{
    private static final long serialVersionUID = -505469822666978576L;

    /**
     * Password
     */
    private String password;

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

    /**
     * Rechte fürs Login
     */
    public String authority;

    @Column(nullable = false, columnDefinition ="VARCHAR2(45) default='ROLE_ADMIN")
    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
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

    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
