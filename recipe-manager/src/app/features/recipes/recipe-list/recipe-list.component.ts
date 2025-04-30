// src/app/features/recipes/recipe-list/recipe-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { Recipe, RecipeService } from '../../../core/services/recipe.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes$!: Observable<Recipe[]>;
  isLoading = false;
  loadingError: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.isLoading = false;
    this.loadingError = null;
  
    console.log('Se face request către getRecipes()...');
  
    this.recipes$ = this.recipeService.getRecipes().pipe(
      tap((data) => {
        console.log('DATE PRIMITE:', data); // 🟢 vezi aici ce primește
      }),
      catchError((err) => {
        console.error('Eroare la încărcare:', err);
        this.loadingError = 'A apărut o eroare la încărcarea rețetelor.';
        return of([]);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
  
  
  parseIngredients(ingredients: string): string[] {
    try {
      return JSON.parse(ingredients);
    } catch {
      return ['(ingrediente invalide)'];
    }
  }
  

  deleteRecipe(id: string | number, event: Event): void {
    event.stopPropagation();
    if (confirm('Sigur dorești să ștergi această rețetă?')) {
      this.recipeService.deleteRecipe(id.toString()).subscribe({
        next: () => {
          console.log('Rețetă ștearsă cu succes');
          this.loadRecipes();
        },
        error: (err) => {
          console.error('Eroare la ștergerea rețetei:', err);
          alert('Eroare la ștergerea rețetei!');
        }
      });
    }
  }

  goToRecipeDetail(recipeId: string | number): void {
    this.router.navigate(['/recipes', recipeId]);
  }
}
