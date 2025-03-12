import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: any[] = [];

  constructor(private recipeService: RecipeService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (data) => (this.recipes = data),
      (error) => console.error('Eroare la încărcarea rețetelor:', error)
    );
  }

  openConfirmationDialog(recipeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Sigur doriți să ștergeți această rețetă?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecipe(recipeId);
      }
    });
  }

  deleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
      },
      (error) => console.error('Eroare la ștergerea rețetei:', error)
    );
  }
}