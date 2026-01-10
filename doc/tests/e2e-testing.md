# E2E-Testablauf

Diese Dokumentation beschreibt das Setup und die Ausführung der End-to-End-Tests für das Projekt.

## 1. Voraussetzungen

Damit die Tests lokal laufen können, müssen folgende Tools installiert sein:

* **Node.js & npm**: Für das Frontend und die Test-Runner.
* **Java (JDK)**: Für das Spring Boot Backend.
* **Installation**: Vor dem ersten Start im Frontend-Verzeichnis `npm install` ausführen.

## 2. Start der Applikation

Für E2E-Tests müssen Frontend und Backend parallel laufen.

### Backend (mit Testdaten)

Das Backend wird mit dem Profil `test` gestartet. Dies sorgt dafür, dass die H2 In-Memory Datenbank genutzt und automatisch über die `data.sql` befüllt wird.

* **Befehl**: `SPRING_PROFILES_ACTIVE=test ./mvnw spring-boot:run`
* **URL**: `http://localhost:8000`
* **DB-Konsole**: `http://localhost:8000/h2-console` (JDBC URL: `jdbc:h2:mem:e2e-db`)

### Frontend

Das Frontend wird im Development-Modus gestartet:

* **Befehl**: `npm run start:frontend
`
* **URL**: `http://localhost:4200`

## 3. Ausführung der E2E-Tests

Die Tests werden über npm-Skripte gesteuert. Stelle sicher, dass Frontend und Backend erreichbar sind, bevor du die Tests startest.

| Befehl | Beschreibung |
|--------|--------------|
| `npm run e2e` | Führt alle Tests im Headless-Modus aus (Konsole). |
| `npm run e2e:headed` | Öffnet das Test-UI (man sieht den Browser bei der Arbeit). |
| `npm run e2e:ci` | Spezielles Skript für die Pipeline (erstellt Reports). |

## 4. Konfiguration & Profile

* **Backend-Profil**: `test` (löscht und erstellt die DB bei jedem Neustart neu).
* **Testdaten**: Werden automatisch über `src/main/resources/data.sql` in die Tabelle `report` geladen.
* **Ports**: Backend (8080), Frontend (Standard-Port des Frameworks).