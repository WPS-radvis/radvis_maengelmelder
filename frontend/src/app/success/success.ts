import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportStateService } from '../core/globalService/report-state.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, MatButton],
  templateUrl: './success.html',
  styleUrls: ['./success.css'],
})
export class Success {
  constructor(
    private router: Router,
    private reportState: ReportStateService,
  ) {}

  newReport(): void {
    this.reportState.reset();
    void this.router.navigate(['mängel']);
  }
}
