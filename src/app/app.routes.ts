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
        path: '',
        loadComponent: () => import('./pages/home-page/home-page.component').then(c => c.HomePageComponent),
      },
      {
        path: 'clients',
        loadComponent: () => import('./pages/clients-page/clients-page.component').then(c => c.ClientsPageComponent),
      },
      {
        path: 'equipos',
        loadComponent: () => import('./pages/equipos-page/equipos-page.component').then(c => c.EquiposPageComponent),
      },
      {
        path: 'equipos/nuevo',
        loadComponent: () => import('./pages/nuevo-equipo-page/nuevo-equipo-page.component').then(c => c.NuevoEquipoPageComponent)
      },
      {
        path: 'equipos/:id',
        loadComponent: () => import('./pages/equipo-detalle-page/equipo-detalle-page.component').then(c => c.EquipoDetallePageComponent)
      },
      {
        path: 'equipos/:id/editar',
        loadComponent: () => import('./pages/editar-equipo-page/editar-equipo-page.component').then(c => c.EditarEquipoPageComponent)
      },
      {
        path: 'mantenimiento',
        loadComponent: () => import('./pages/mantenimiento-page/mantenimiento-page.component').then(c => c.MantenimientoPageComponent),
      },
      {
        path: 'mantenimiento/:id/nuevo',
        loadComponent: () => import('./pages/mantenimiento-formulario-page/mantenimiento-formulario-page.component').then(c => c.MantenimientoFormularioPageComponent),
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings-page/settings-page.component').then(c => c.SettingsPageComponent)
      },
      {
        path: '**',
        redirectTo: '',
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
