import { Routes } from '@angular/router';
import {NotFoundComponent} from "./pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
