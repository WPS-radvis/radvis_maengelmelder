import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';


/**
 * Komponente zum Aufnehmen oder Auswählen eines Fotos.
 * Stellt eine einfache Oberfläche bereit und gibt das gewählte Bild
 * über ein Output-Event an die Parent-Komponente weiter.
 */

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './camera.html',
  styleUrl: './camera.css',
})

/**
 * Komponente zum Aufnehmen oder Auswählen eines Fotos.
 * Stellt eine einfache Oberfläche bereit und gibt das gewählte Bild
 * über ein Output-Event an die Parent-Komponente weiter.
 */

export class Camera {
  fileName = '';

  /** Base64-Daten für die Bildvorschau (null, wenn kein Bild gewählt wurde) */
  previewData: string | null = null;

  /**
   * Gibt das gewählte oder aufgenommene Foto an die Parent-Komponente zurück
   *
   * -Emit: File → wenn ein Foto erfolgreich ausgewählt wurde
   * -Emit: File → wenn die Auswahl abgebrochen oder zurückgesetzt wurde
   */

  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  @Output() photosTaken = new EventEmitter<File[]>();

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Wird ausgelöst, wenn der Benutzer eine Datei auswählt.
   *
   * - Liest die gewählte Datei aus dem Input-Element
   * - Zeigt eine Bildvorschau an (Base64)
   * - Sendet die Datei über das Output-Event an die Parent-Komponente
   * - Sendet `null`, wenn keine Datei ausgewählt wurde
   *
   * @param e Browser-Event des Datei-Inputs
   */
  onFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0] || null;

    this.fileName = f ? f.name : '';

    if (!f) {
      return;
    }

    if (this.selectedFiles.length >= 3) {
      this.snackBar.open(
        'Maximal 3 Bilder erlaubt. Weitere Fotos wurden nicht übernommen.',
        'OK',
        { duration: 3000 }
      );
      return;
    }

    this.selectedFiles.push(f);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls.push(reader.result as string);
      this.photosTaken.emit(this.selectedFiles);
    };

    reader.readAsDataURL(f);
    input.value = '';
  }

  /**
   * Löscht das aktuell ausgewählte Foto.
   * - Entfernt den Dateinamen.
   * - Setzt die Bildvorschau auf null.
   * - Informiert die Parent-Komponente über das Output-Event,
   *   das kein Foto mehr vorhanden ist
   */
  removePhoto(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
    this.photosTaken.emit(this.selectedFiles);
  }
}
