import { Routes } from '@angular/router';
import { Karte } from './karte/karte';
import { Formular } from './formular/formular';
import { Success } from './success/success';

export const routes: Routes = [
  { path: 'mängel', component: Karte },
  { path: 'mängel/meldung', component: Formular },
  { path: 'mängel/erfolg', component: Success },
  { path: '', pathMatch: 'full', redirectTo: 'mängel' },
  { path: '**', redirectTo: 'mängel' },
];
