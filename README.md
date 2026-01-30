# 🚲 RadVIS - Mängelmeldung per Karten-Klick 
RadVis ist eine Webanwenung zur Meldung von Infrastrukturmängeln.
Nutzer können einen Standort über eine interaktive Karte auswählen,
ein Formular ausfüllen und optional Fotos hochladen.

## Features
- 📍 Standortauswahl per Karten-Klick
- 📌 Marker wird auf der Karte gesetzt
- 📝 Formular zur Mängelbeschreibung
- 📷 Foto-Upload (max. 3 Bilder)

## Tech-Stack
-Angular
-Angular Material
Java Backend (REST)

## Installation
- ```bash
  - npm install
  - npm start
  - Frontend läuft unter: https://localhost4200
# 🚲 RadVis Mängelmelder – Projektdokumentation

Dieses Repository enthält das System zur Erfassung und Visualisierung von Radverkehrs-Mängeln. Um die Wartbarkeit des Codes zu gewährleisten, setzen wir auf automatisierte Dokumentations-Tools für das Frontend und das Backend.

---

# 🚲 RadVis Mängelmelder – Doku-Guide

Damit wir beim Coden nicht den Überblick verlieren und neue Leute sich schnell zurechtfinden, schreiben wir unsere Doku nicht von Hand, sondern lassen sie uns generieren. Hier steht, wie du das machst.

---

## 🛠 So kriegst du die Doku

### 🎨 Frontend (Angular)
Wir nutzen **Compodoc**. Das Tool scannt unseren Code und baut daraus eine schicke Website, auf der man sieht, wie Komponenten und Module zusammenhängen.

1. Geh in den `frontend` Ordner.
2. **Doku bauen:** `npm run docs:frontend`
3. **Doku anschauen:** `npx compodoc -s -d doc/frontend` (läuft dann auf [http://localhost:8080](http://localhost:8080))

> **Info:** Wir verstecken den echten Quellcode in der Doku (`--disableSourceCode`), damit es übersichtlich bleibt und man nur die Beschreibungen sieht.

---

### ⚙️ Backend (Java / Spring Boot)
Hier haben wir zwei Sachen: Einmal den technischen Deep-Dive für den Code und einmal was zum Ausprobieren für die API.

#### Javadoc (Für den Code)
Wenn du wissen willst, was eine Methode genau macht:
1. Geh in den `backend` Ordner.
2. **Generieren:** `./mvn javadoc:javadoc`
3. **Anschauen:** Öffne einfach `backend/target/reports/apidocs/index.html` im Browser.

