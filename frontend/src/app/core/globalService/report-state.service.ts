import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportStateService {
  private selectedLat: number | null = null;
  private selectedLng: number | null = null;

  setLocation(lat: number, lng: number): void {
    this.selectedLat = lat;
    this.selectedLng = lng;
  }

  getLocation(): { lat: number; lng: number } | null {
    if (this.selectedLat === null || this.selectedLng === null) {
      return null;
    }
    return { lat: this.selectedLat, lng: this.selectedLng };
  }

  hasLocation(): boolean {
    return this.selectedLat !== null && this.selectedLng !== null;
  }

  reset(): void {
    this.selectedLat = null;
    this.selectedLng = null;
  }
}
