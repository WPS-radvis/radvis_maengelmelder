import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // deprecated, drunter aktueller Client - aber wo wird's genutzt?
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    MatSnackBarModule,
    Header,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  photoFile: File | null = null;

  onPhotoFromCamera(file: File | null) {
    this.photoFile = file;
    console.log('Foto im Parent empfangen:', file);
  }
}
