// src/app/features/recipes/recipe-detail/recipe-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../../core/services/recipe.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { finalize } from 'rxjs'; // Keep finalize for loading state

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  recipe: Recipe | null = null;
  isLoading = false; // Start in loading state
  loadingError: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get ID directly from snapshot
    this.isLoading = false;
    this.loadingError = null;
    this.recipe = null;

    if (!id) {
      console.error('ID-ul rețetei lipsește din rută');
      this.loadingError = 'ID-ul rețetei este invalid.';
      this.isLoading = false;
      return;
    }

    this.recipeService.getRecipeById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          console.log('HTTP request finalized. isLoading:', this.isLoading);
        })
      )
      .subscribe({
        next: (fetchedRecipe) => {
          console.log('Recipe fetched successfully:', fetchedRecipe);
          if (fetchedRecipe && typeof fetchedRecipe.ingredients === 'string') {
            try {
              fetchedRecipe.ingredients = JSON.parse(fetchedRecipe.ingredients);
            } catch (error) {
              console.error('Error parsing ingredients:', error);
              fetchedRecipe.ingredients = '';
            }
          }
          this.recipe = fetchedRecipe;
          console.log('Recipe property set:', this.recipe);
        },
        error: (err) => {
          console.error('Error fetching recipe details:', err);
          this.loadingError = 'Nu s-au putut încărca detaliile rețetei.';
          this.recipe = null;
        }
      });
  }
}