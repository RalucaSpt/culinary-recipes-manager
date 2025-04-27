// src/app/features/recipes/recipe-list/recipe-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesită CommonModule pentru *ngFor, async pipe etc.
import { RouterLink } from '@angular/router'; // Necesită RouterLink pentru navigare
import { Observable } from 'rxjs';
import { Recipe, RecipeService } from '../../../core/services/recipe.service'; // Importă serviciul și interfața rețetă

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importă module/componente necesare
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  private recipeService = inject(RecipeService);
  recipes$!: Observable<Recipe[]>; // Folosește $ pentru a indica un Observable

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  deleteRecipe(id: string, event: Event): void {
      event.stopPropagation(); // Previne navigarea dacă butonul e pe un element clickabil
      if (confirm('Sigur dorești să ștergi această rețetă?')) {
          this.recipeService.deleteRecipe(id).subscribe({
              next: () => {
                  console.log('Rețetă ștearsă cu succes');
                  // Reîncarcă lista după ștergere
                  this.recipes$ = this.recipeService.getRecipes();
              },
              error: (err) => console.error('Eroare la ștergerea rețetei:', err)
          });
      }
  }
}