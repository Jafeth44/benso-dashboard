import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'information',
    loadComponent: () => import('./pages/information-page/information-page.component').then(c => c.InformationPageComponent),
    pathMatch: 'full'
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats-page/stats-page.component').then(c => c.StatsPageComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
