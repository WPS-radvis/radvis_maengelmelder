# Projekt Git-Workflow

Dieser Git-Workflow beschreibt die Vorgehensweise beim Arbeiten mit unserem Projekt-Repository.  
Ziel ist es, sauberen Code, klare Zuständigkeiten und eine stabile Codebasis im `main`-Branch sicherzustellen.

---

## Haupt-Branch (`main`)

- Der `main` Branch ist unser **Haupt-Branch**.
- Er enthält **ausschließlich stabilen, getesteten Code**.
- Direkte Änderungen (Commit/Push) im `main` Branch sind **nicht erlaubt**.
- Änderungen gelangen **nur über Pull Requests** in den `main` Branch.

---

## Arbeiten mit Branches

### 1. Branch-Erstellung

- Für **jede Aufgabe, jedes Feature oder jeden Bugfix** wird ein eigener Branch erstellt.
- Ein Branch wird **immer vom aktuellen `main` Branch** erstellt.

**Branch-Namenskonventionen:**

Verwende sprechende Namen mit einem Präfix:

- `feature/<beschreibung>` – neue Features
- `fix/<beschreibung>` – Bugfixes
- `test/<beschreibung>` – Tests oder Testanpassungen
- `refactor/<beschreibung>` – Code-Verbesserungen ohne neue Funktionalität
- `docs/<beschreibung>` – Dokumentation

**Beispiele:**
- `feature/benutzeranmeldung`
- `fix/bugfix-login`
- `test/camera-spec`
- `docs/git-workflow`

---

### 2. Entwicklung im Branch

- Die gesamte Entwicklung erfolgt **ausschließlich im eigenen Branch**.
- Commits sollen eine **klare, beschreibende Commit-Nachricht** haben
- Änderungen werden regelmäßig in den eigenen Branch gepusht.

---

## Pull Request (PR)

### 1. Pull Request erstellen

Sobald die Arbeit abgeschlossen ist:

- alle Änderungen committed sind
- im Branch gepusht wurde
- Tests erfolgreich laufen

wird ein **Pull Request (PR)** erstellt.

#### So erstellst du einen Pull Request:

1. Öffne das Repository auf GitHub
2. Wechsle zur Registerkarte **"Pull requests"**
3. Klicke auf **"New pull request"**
4. Wähle:
    - **Base branch:** `main`
    - **Compare branch:** dein Branch den du in main mergen willst
5. Vergib einen aussagekräftigen Titel
6. Beschreibe im Textfeld:
    - was geändert wurde
    - ggf. Bezug zur Trello-Task
7. Klicke auf **"Create pull request"**

---

### 2. Review und Merge

- Jeder Pull Request muss von **mindestens einem Teammitglied reviewed und approved** werden.
- Automatische Checks (Tests, Linting) müssen **erfolgreich** sein.
- Nach dem Approval:
    - kann der PR **entweder von dir selbst**
    - oder von der Person, die approved hat,
      gemerged werden.
- Nach dem Merge kann der Feature-Branch gelöscht werden.

---

## Best Practices

- Vor dem Erstellen eines Branches:
    - `main` aktualisieren (`git pull`)
- Kleine, fokussierte Pull Requests bevorzugen
- Keine unfertigen oder experimentellen Änderungen mergen
- Tests lokal ausführen, bevor ein PR erstellt wird
- Pull Requests klar benennen und beschreiben

---

## Commit-Nachrichten

- Commit-Nachrichten sollen:
    - ausführlich und prägnant sein
    - den Zweck der Änderung beschreiben
- Beispiel:
    - `Fix Kamera-Test: FileReader korrekt mocken`
    - `Feature: Mehrfach-Upload für Kamera hinzufügen`

