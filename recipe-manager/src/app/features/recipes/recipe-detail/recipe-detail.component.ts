// src/app/features/recipes/recipe-detail/recipe-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../../core/services/recipe.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  recipe: Recipe | null = null;
  isLoading = false;
  loadingError: string | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
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
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (fetchedRecipe) => {
          if (fetchedRecipe && typeof fetchedRecipe.ingredients === 'string') {
            fetchedRecipe.ingredients = (fetchedRecipe.ingredients as string).split(',').map((i: string) => i.trim());
          }
          this.recipe = fetchedRecipe;
        },
        error: (err) => {
          console.error('Error fetching recipe details:', err);
          this.loadingError = 'Nu s-au putut încărca detaliile rețetei.';
          this.recipe = null;
        }
      });
  }

  deleteRecipe(): void {
    if (!this.recipe?.id) return;

    if (confirm('Sigur dorești să ștergi această rețetă?')) {
      this.recipeService.deleteRecipe(this.recipe.id).subscribe({
        next: () => {
          console.log('Rețetă ștearsă cu succes');
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          console.error('Eroare la ștergerea rețetei:', err);
          alert('A apărut o eroare la ștergerea rețetei.');
        }
      });
    }
  }
}
