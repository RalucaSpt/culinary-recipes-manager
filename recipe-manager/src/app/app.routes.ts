// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard'; // Importă guard-ul

export const routes: Routes = [
  // Rute publice
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Autentificare'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
    title: 'Înregistrare'
  },

  // Rute pentru rețete (unele pot fi publice, altele private)
  {
    path: 'recipes',
    loadComponent: () => import('./features/recipes/recipe-list/recipe-list.component').then(m => m.RecipeListComponent),
    title: 'Rețete'
    // Poate fi accesibilă public
  },
  {
    path: 'recipes/new',
    loadComponent: () => import('./features/recipes/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent),
    canActivate: [authGuard], // <<< PROTEJAT: Doar userii logați pot adăuga
    title: 'Adaugă Rețetă'
  },
  {
    path: 'recipes/:id',
    loadComponent: () => import('./features/recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
    title: 'Detalii Rețetă'
    // Poate fi accesibilă public
  },
  {
    path: 'recipes/:id/edit',
    loadComponent: () => import('./features/recipes/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent),
    canActivate: [authGuard], // <<< PROTEJAT: Doar userii logați pot edita
    title: 'Editează Rețetă'
  },

  // Redirect și Wildcard
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Pagina Nu A Fost Găsită'
  }
];