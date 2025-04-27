// src/app/features/recipes/recipe-detail/recipe-detail.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Importă finalize și tap din RxJS
import { Observable, switchMap, finalize, tap, catchError, EMPTY, of } from 'rxjs';
import { Recipe, RecipeService } from '../../../core/services/recipe.service';
// Importă SpinnerComponent dacă l-ai creat
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component'; // Ajustează calea

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  // Adaugă SpinnerComponent la imports
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './recipe-detail.component.html',
  // Folosește CSS-ul deja creat pt recipe-detail
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  recipe$!: Observable<Recipe | null>; // Poate fi și null în caz de eroare
  isLoading = false; // Proprietate pentru starea de încărcare
  loadingError: string | null = null; // Proprietate pentru eroare

  ngOnInit(): void {
    this.recipe$ = this.route.paramMap.pipe(
      tap(() => {
          this.isLoading = true; // Începe încărcarea când primim params
          this.loadingError = null;
      }),
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          console.error('ID-ul rețetei lipsește din rută');
          this.loadingError = 'ID-ul rețetei este invalid.';
          // Returnează un observable care emite null sau EMPTY pentru a opri fluxul
          return of(null); // Sau EMPTY
        }
        return this.recipeService.getRecipeById(id).pipe(
            catchError(err => {
                console.error('Error fetching recipe details:', err);
                this.loadingError = 'Nu s-au putut încărca detaliile rețetei.';
                return of(null); // Returnează null în caz de eroare HTTP
            })
        );
      }),
      finalize(() => {
        this.isLoading = false; // Termină încărcarea (succes sau eroare)
        console.log('Detail loading finished');
      })
    );
  }
}