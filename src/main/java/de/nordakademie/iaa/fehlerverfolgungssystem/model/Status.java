package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Enumeration aller vorhandenen Status.
 * Dies soll eine einfachere und allgemeing�ltige Handhabung der Status erm�glichen
 */
public enum Status {

    /**
     * Anglegt
     */
    CREATED(1, "Angelegt"),
    /**
     * In Bearbeitung
     */
    IN_PROGRESS(2, "In Bearbeitung"),
    /**
     * Behoben
     */
    DONE(3, "Behoben"),
    /**
     * Abgelehnt
     */
    DECLINED(4, "Abgelehnt"),
    /**
     * Wiederer�ffnet
     */
    REOPENED(5, "Wiederer�ffnet"),
    /**
     * Geschlossen
     */
    CLOSED(6, "Geschlossen");

    private int code;
    private String label;

    private static Map<Integer, Status> codeToStatusMapping;

    Status(int code, String label) {
        this.code = code;
        this.label = label;
    }

    public static Status getStatus(int i) {
        if (codeToStatusMapping == null) {
            initMapping();
        }
        return codeToStatusMapping.get(i);
    }

    private static void initMapping() {
        codeToStatusMapping = new HashMap<>();
        for (Status s : values()) {
            codeToStatusMapping.put(s.code, s);
        }
    }

    public int getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

}
