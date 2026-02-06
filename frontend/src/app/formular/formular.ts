import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService } from '../core/globalService/api.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PhotoUpload } from '../photo-upload/photo-upload';
import { Camera } from '../camera/camera';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ReportStateService } from '../core/globalService/report-state.service';
import { Issue } from '../core/model/issue.type';



/**
 * Komponente für das Mängelmelden-Formular.
 * Verwaltet die Benutzereingaben, Datenuploads und die API-Kommunikation.
 */

@Component({
  selector: 'app-formular',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    MatHint,
    MatProgressSpinner,
    MatButton,
    MatOption,
    PhotoUpload,
    MatIconModule,
    Camera,
  ],
  templateUrl: './formular.html',
  styleUrl: './formular.css',
})
export class Formular implements OnInit {

  /** Die aktuell ausgewählte Kategorie (z. B. „Straßenschaden“) */
  selectedCategory: Issue | null = null;

  /** Kategorien vom Backend, werden beim Laden des Formulars gefüllt */
  categories: { value: Issue; label: string } [] = [];

  /** Beschreibung des Mangels, die der Nutzer eingibt */
  description: string = '';

  /** Flag für den Ladezustand – true während einer API-Anfrage */
  isLoading = signal(false);

  /** Alle ausgewählten bzw. aufgenommenen Bilder */
  selectedFiles: File[] = [];


  /**
   * Referenz zur untergeordneten PhotoUpload-Komponente, um deren Methode aufzurufen (z.B. zum Zurücksetzen).
   **/
  @ViewChild('photoUpload') photoUpload!: PhotoUpload;


  /**
   * Konstruktor der Klasse.
   * Hier werden die Services reingeholt, die wir in der Komponente brauchen.
   * Der ApiService kümmert sich um die Kommunikation mit dem Backend
   * und der MatSnackBar zeigt kleine Hinweise/Fehlermeldungen im UI an.
   *
   * @param apiService - Service für Requests an das Backend
   * @param snackBar - Angular Material SnackBar für kurze Benachrichtigungen
   * @param reportState - Frontend-State für die aktuell ausgewählte Meldung (insb. Standort)
   * @param router - Angular Router für die Navigation zur Erfolgsseite
   */
  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private reportState: ReportStateService,
    private router: Router,) {}


  /**
   * Lifecycle-Hook von Angular, aufgerufen nach der Initialisierung der Komponente.
   * Lädt die Kategorien beim Start der Komponente aus dem Backend.
   */
  ngOnInit() {
    // Lädt Kategorien vom Backend beim Start
    this.apiService.getIssue().subscribe({
      next: (response) => {
        this.categories = (response as Issue[]).map((issue: Issue) => ({ value: issue, label: this.translateIssue(issue),
        }));
        console.log('Kategorien vom Backend geladen:', this.categories);
      },
      error: (error) => {
        console.error('Fehler beim Laden der Kategorien:', error);
        // Fallback: Zeige dem User eine Meldung
        alert('Kategorien konnten nicht geladen werden!');
      },
    });
  }

  /**
  * Sendet die komplette Mängel-Meldung (Kategorie, Beschreibung, Fotos, Standort)
  * an das Backend. Wird per Klick auf den "Absenden"-Button ausgelöst.
  *
  * Dabei wird ein FormData-Objekt gebaut, das den Report als JSON
  * und alle ausgewählten Fotos enthält.
   * @param photoUpload - Referenz zur PhotoUpload-Komponente, um nach dem Senden den Upload-Zustand zurückzusetzen
  */

  /**
   * Sendet die Mängel-Meldung an das Backend
   * Wird aufgerufen beim Klick auf den "Absenden"-Button
   * @param photoUpload
   */
  submitReport(photoUpload?: any): void {
    const coords = this.reportState.getLocation();

    if (!this.selectedCategory && this.description.trim() === '') {
      alert('Bitte wähle eine Kategorie oder gib eine Beschreibung ein!');
      return;
    }

    //  Erzeugt den Report-Objekt mit allen Daten des Formulares
    const formData = new FormData();

    const issueEnum = this.selectedCategory
      ? this.labelToIssue(this.selectedCategory)
      : 'KEINE_KATEGORIE';

    formData.append('issue', issueEnum);

    formData.append('description', this.description.trim());

    formData.append('latitude', (coords?.lat ?? '').toString());
    formData.append('longitude', (coords?.lng ?? '').toString());

    // Fügt alle ausgewählten Fotos hinzu (Name wie im Originalfile)
    for (const file of this.selectedFiles) {
      formData.append('files', file);
    }


    this.isLoading.set(true);
    console.log('Sende FormData ab...');

    this.apiService.createReport(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Danke, dass Sie den Mangel gemeldet haben!', '', { duration: 3000 });

        // NACH erfolgreichem Senden:
        this.selectedCategory = null;
        this.description = '';
        this.selectedFiles = []; // ← Fotos zurücksetzen

        this.photoUpload.resetUploadState();

        this.isLoading.set(false);

        this.reportState.reset();
        void this.router.navigate(['mängel/erfolg']);
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Fehler beim Submit', error);
        this.snackBar.open('Fehler beim Senden!', '', { duration: 2500 });
      },
    });
  }
  private translateIssue(issue: Issue): string {
    switch (issue) {
      case 'SCHLAGLOCH':
        return 'Schlagloch';
      case 'SCHLECHTER_STRASSENBELAG':
        return 'Schlechter Straßenbelag';
      case 'BEWUCHS':
        return 'Bewuchs';
      case "FEHLENDE_BESCHILDERUNG":
        return 'Fehlende Beschilderung';
      case "FALSCHE_BESCHILDERUNG":
        return 'Falsche Beschilderung';
      case "POLLER_HINDERNIS":
        return 'Poller/Hindernis';
      case "UNKLARE_MARKIERUNG":
        return 'Unklare Markierung';
      case "UNEBENHEITEN_BODENWELLEN":
        return 'Unebenheiten/Bodenwellen';
      case "KEINE_KATEGORIE":
        return 'Keine Kategorie';
      default:
        return issue;
    }
  }
  private labelToIssue(label: string): Issue {
    switch (label) {
      case 'Schlagloch': return 'SCHLAGLOCH';
      case 'Schlechter Straßenbelag': return 'SCHLECHTER_STRASSENBELAG';
      case 'Bewuchs': return 'BEWUCHS';
      case 'Fehlende Beschilderung': return 'FEHLENDE_BESCHILDERUNG';
      case 'Falsche Beschilderung': return 'FALSCHE_BESCHILDERUNG';
      case 'Poller/Hindernis': return 'POLLER_HINDERNIS';
      case 'Unklare Markierung': return 'UNKLARE_MARKIERUNG';
      case 'Unebenheiten/Bodenwellen': return 'UNEBENHEITEN_BODENWELLEN';
      case 'Keine Kategorie': return 'KEINE_KATEGORIE';
      default:
        return 'KEINE_KATEGORIE'; // ← mejor que throw en producción
    }
  }

  /**
   * Wird aufgerufen, wenn ein Foto über die Kamera aufgenommen wird.
   * @param photo - Die aufgenommene Foto-Datei oder null, falls der Vorgang abgebrochen wurde
   */
  onPhotoAdded(photo: File | null): void {
    if (photo) {

      // console.log dient nur zum Testen und kann entfernt werden
      console.log('Kamera-Foto empfangen:', photo.name);
      this.selectedFiles.push(photo);
    } else {
      console.warn('onPhotoAdded aufgerufen, aber kein Foto empfangen.');
    }
  }


  /**
   * Wird aufgerufen, wenn neue Fotos aus der Upload-Komponente kommen.
   * Entfernt Duplikate und fügt nur wirklich neue Dateien hinzu.
   *
   * @param files Die ausgewählten Dateien, die von der Upload-Komponente geliefert werden.
   */
  onPhotosSelected(files: File[]): void {
    const uniqueIncoming = files.filter(
      (file, index, self) =>
        index === self.findIndex((f) => f.name === file.name && f.size === file.size),
    );

    const newOnes = uniqueIncoming.filter(
      (f) =>
        !this.selectedFiles.some(
          (existing) => existing.name === f.name && existing.size === f.size,
        ),
    );

    this.selectedFiles.push(...newOnes);
  }

  /**
   * Fügt Dateien zur Auswahl hinzu, verhindert Duplikate.
   * @param photoFile - Die aufgenommene Foto-Datei oder `null`, wenn die Aufnahme
   * abgebrochen wurde oder fehlgeschlagen ist
   */
  onPhotoFromCamera(photoFile: File[]): void {
    if (photoFile) {
      console.log('📸 Foto von Kamera empfangen:', photoFile);
      // Später kannst du es direkt an PhotoUpload übergeben oder speichern
    } else {
      console.warn('Kein Foto empfangen.');
    }
  }
}


