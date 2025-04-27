import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component'; // Ensure this path is correct and the file exists
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { RecipeManagerComponent } from './services/recipe-manager/recipe-manager.component';

export const routes: Routes = [
    { path: '', component: RecipeManagerComponent },
    {path: 'add-recipe', component: RecipeFormComponent},
    {path: 'confirm-delete', component: ConfirmationDialogComponent}
];
