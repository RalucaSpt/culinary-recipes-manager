import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'; // Ensure this path is correct and the file exists
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

export const routes: Routes = [
    { path: '', component: RecipeListComponent },
    {path: 'add-recipe', component: RecipeFormComponent},
    {path: 'confirm-delete', component: ConfirmationDialogComponent}
];
