import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from '../../components/recipe-form/recipe-form.component';
import { RecipeListComponent } from '../../components/recipe-list/recipe-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-manager',
  standalone: true,
  imports: [CommonModule, RecipeFormComponent, RecipeListComponent, MatToolbarModule],
  templateUrl: './recipe-manager.component.html',
  styleUrls: ['./recipe-manager.component.css'],
})
export class RecipeManagerComponent implements OnInit {
  recipes: any[] = [];
  router = inject(Router);
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.recipeService.getRecipes().subscribe(
      (recipes) => (this.recipes = recipes),
      (error) => console.error('Eroare la încărcarea rețetelor:', error)
    );
  }

  onRecipeSubmitted(newRecipe: any): void {
    this.recipes.push(newRecipe);
  }

  onDeleteRecipe(recipeId: number): void {
    this.recipeService.deleteRecipe(recipeId).subscribe(
      () => {
        this.recipes = this.recipes.filter((recipe) => recipe.id !== recipeId);
      },
      (error) => console.error('Eroare la ștergerea rețetei:', error)
    );
  }

  navigateToAddSection(): void {
    this.router.navigate(['/add-recipe']);
  }
}