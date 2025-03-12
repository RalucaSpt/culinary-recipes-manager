import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'; // Ensure this path is correct and the file exists

export const routes: Routes = [
    { path: '', component: RecipeListComponent },
];
