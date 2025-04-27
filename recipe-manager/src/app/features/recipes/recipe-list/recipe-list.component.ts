// src/app/features/recipes/recipe-list/recipe-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
// Importă finalize din RxJS
import { Observable, finalize, tap } from 'rxjs';
import { Recipe, RecipeService } from '../../../core/services/recipe.service';
// Importă SpinnerComponent dacă l-ai creat
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component'; // Ajustează calea

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  // Adaugă SpinnerComponent la imports
  imports: [CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './recipe-list.component.html',
  // Folosește CSS-ul deja creat pt recipe-list
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes$!: Observable<Recipe[]>;
  isLoading = false; // Proprietate pentru starea de încărcare

  // Variabilă pentru a gestiona erorile (opțional)
  loadingError: string | null = null;

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.isLoading = true; // Începe încărcarea
    this.loadingError = null; // Resetează eroarea
    this.recipes$ = this.recipeService.getRecipes().pipe(
       tap({ // tap poate fi folosit pentru debug sau acțiuni secundare
           // next: () => console.log('Recipes fetched'),
           error: (err) => {
               console.error('Error fetching recipes:', err);
               this.loadingError = 'A apărut o eroare la încărcarea rețetelor.';
               // Poți returna un Observable gol pentru a evita erori în async pipe
               // return of([]);
           }
       }),
       finalize(() => {
         this.isLoading = false; // Termină încărcarea (succes sau eroare)
         console.log('Loading finished');
       })
     );
  }

  deleteRecipe(id: string, event: Event): void {
      event.stopPropagation();
      if (confirm('Sigur dorești să ștergi această rețetă?')) {
          // Poți adăuga un indicator de loading specific pentru ștergere dacă dorești
          this.recipeService.deleteRecipe(id).subscribe({
              next: () => {
                  console.log('Rețetă ștearsă cu succes');
                  // Reîncarcă lista după ștergere
                  this.loadRecipes(); // Folosește metoda reîncărcare
                  // Afișează un toast de succes aici
              },
              error: (err) => {
                  console.error('Eroare la ștergerea rețetei:', err);
                  // Afișează un toast de eroare aici
              }
          });
      }
  }
}