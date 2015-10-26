package de.nordakademie.iaa.fehlerverfolgungssystem.model;

import java.util.HashMap;
import java.util.Map;

/**
 * Enumeration aller vorhandenen Status.
 * Dies soll eine einfachere und allgemeingültige Handhabung der Status ermöglichen.
 * Die Bezeichnung der Entitäten ist in Deutsch, damit sie in der Oberfläche auch Deutsch angezeigt werden
 */
public enum Status {

    /**
     * Anglegt
     */
    ANGELEGT(1, "Angelegt"),
    /**
     * In Bearbeitung
     */
    IN_BEARBEITUNG(2, "In Bearbeitung"),
    /**
     * Behoben
     */
    BEHOBEN(3, "Behoben"),
    /**
     * Abgelehnt
     */
    ABGELEHNT(4, "Abgelehnt"),
    /**
     * Wiedereröffnet
     */
    WIEDEREROEFFNET(5, "Wiedereröffnet"),
    /**
     * Geschlossen
     */
    GESCHLOSSEN(6, "Geschlossen");

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
