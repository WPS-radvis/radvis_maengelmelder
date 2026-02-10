# 🚲 RadVIS - Mängelmeldung per Karten-Klick 
Diese Anwendung ist die **User-App zur Erfassung von Infrastrukturmängeln** im Radverkehr.
Nutzer:innen können über eine interaktive Karte einen Standort auswählen, eine Beschreibung eingeben und optional Fotos hochladen.

Die App ist Teil des übergeordneten **RadVIS-Projekts**.
Das eigentliche **RadVIS-System zur Verwaltung, Analyse und Visualisierung der Meldungen befindet sich in einem **seperaten Repository**.

Dieses Repository enthält ausschließlich die **Mängelmelder-App (Frontend + Mock-Backend)**.

Das in diesem Repository enthaltene Backend dient als **Mock-Service für Entwicklung, Tests und Demos**.
Das produktive RadVIS-Backend befindet sich in einem **seperaten Repository**.

---

## Features
- 📍 Standortauswahl per Karten-Klick
- 📌 Marker wird auf der Karte gesetzt
- 📝 Formular zur Mängelbeschreibung
- 📷 Foto-Upload (max. 3 Bilder)

---

## Standortauswahl auf der Karte
Der Standort des Mängels wird interaktiv über eine Karte ausgewählt.
Die Koordinaten werden automatisch übernommen.

![Standortauswahl Karte](images/Bild4.jpg)

---


## Neue Mängelmeldung
Nutzer können eine neue Meldung erfassen, indem sie:

- eine Mängelkategorie auswählen
- eine Beschreibung eingeben
- optional Fotos hochladen
- 
![Neue Mängelmeldung Formular](images/Bild3.jpg)

![Ausgefülltes Formular](images/Bild2.JPG)

---


## Erfolgreicheen Meldung
  Nach dem Absenden einer Meldung erhält der Nutzer eine Bestätigung, dass die Meldung erfolgreich übermittelt wurde.
  
  ![Erfolgsmeldung](images/Bild1.jpg)

  ---
  

## Tech-Stack
**Frontend**
-Angular
-Angular Material
-Leaflet (Karten)

**Backend (Mock-Service)**
-Java
-Spring Boot
-REST-API

Das Backend dient ausschließlich als **Mock-Service für Entwicklung und Demo** und ersetzt nicht das produktive RadVIS-Backend.

---

## Installation

## Projekt klonen
```bash
git clone https://github.com/WPS-radvis/radvis_maengelmelder.git
cd radvis_maengelmelder
```
## Frontend installieren und starten
1. In den Frontend-Ordner wechseln:
```bash
cd frontend
```
2. Abhängigkeiten installieren:
```bash
npm install
```
3. Frontend starten:
```bash
npm run start:frontend
```
Das Frontend läuft anschließend unter:
```
http://localhost:4200
```


# 🚲 RadVis Mängelmelder – Projektdokumentation

Um die Wartbarkeit des Codes zu gewährleisten, setzen wir auf automatisierte Dokumentations-Tools für das Frontend und das Backend.

---

# 🚲 RadVis Mängelmelder – Doku-Guide

Damit wir beim Coden nicht den Überblick verlieren und neue Leute sich schnell zurechtfinden, schreiben wir unsere Doku nicht von Hand, sondern lassen sie uns generieren. Hier steht, wie du das machst.

---

## 🛠 So kriegst du die Doku

### 🎨 Frontend (Angular - Mängelmelder-App)
Wir nutzen **Compodoc**. Das Tool scannt unseren Code und baut daraus eine schicke Website, auf der man sieht, wie Komponenten und Module zusammenhängen.

Diese Dokumentation bezieht sich **ausschließlich auf das Frontend der Mängelmelder-App**.

1. Geh in den `frontend` Ordner.
2. **Doku bauen:** `npm run docs:frontend`
3. **Doku anschauen:** `npx compodoc -s -d doc/frontend` (läuft dann auf [http://localhost:8080](http://localhost:8080))

> **Info:** Wir verstecken den echten Quellcode in der Doku (`--disableSourceCode`), damit es übersichtlich bleibt und man nur die Beschreibungen sieht.

---

### ⚙️ Backend (Mock-API)
Das Backend ist als Spring Boot Mock-Service implementiert. Es stellt die notwendigen Endpunkte für die Radverkehrs-Visualisierung bereit und validiert die Datenstrukturen.

Es handelt sich **nicht um das produktive RadVIS-Backend**.

📖 API-Dokumentation
Die Schnittstellen sind vollständig mit OpenAPI / Swagger dokumentiert. Hier können alle Endpunkte interaktiv ausprobiert werden.

Swagger UI: https://app.swaggerhub.com/apis/YADIGARCC/radvis_maengelmelder/1.0.0

[!IMPORTANT] Voraussetzung: Das Backend muss gestartet sein.

Bash
cd backend
./mvnw spring-boot:run


