import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent),
      },
      {
        path: 'information',
        loadComponent: () => import('./pages/information-page/information-page.component').then(c => c.InformationPageComponent),
      },
      {
        path: 'stats',
        loadComponent: () => import('./pages/stats-page/stats-page.component').then(c => c.StatsPageComponent),
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/clients-page/clients-page.component').then(c => c.ClientsPageComponent),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]
  },
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadComponent: () => import('./auth/auth-layout.component').then(c => c.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/pages/login-page/login-page.component').then(c => c.LoginPageComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/pages/register-page/register-page.component').then(c => c.RegisterPageComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
