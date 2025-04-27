import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'recipes',
    // Lazy load componenta pentru lista de rețete
    loadComponent: () => import('./components/recipe-list/recipe-list.component').then(m => m.RecipeListComponent),
    title: 'Rețete' // Opțional: Setează titlul paginii
  },
  {
    path: 'recipes/new',
    // Lazy load componenta pentru formularul de adăugare
    loadComponent: () => import('./components/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent),
    title: 'Adaugă Rețetă'
  },
  {
    path: 'recipes/:id',
    // Lazy load componenta pentru detaliile rețetei
    // loadComponent: () => import('./features/recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent),
    title: 'Detalii Rețetă' // Poți actualiza titlul dinamic în componentă
  },
   {
    path: 'recipes/:id/edit',
    // Lazy load componenta pentru formularul de editare (poți refolosi RecipeFormComponent)
    loadComponent: () => import('./components/recipe-form/recipe-form.component').then(m => m.RecipeFormComponent),
    title: 'Editează Rețetă'
  },
  {
    // Redirect la lista de rețete dacă calea este goală
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    // Wildcard route pentru pagini 404 (creează o componentă NotFound)
    path: '**',
    // loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Pagina Nu A Fost Găsită'
  }
];