import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: any[] = [
    { id: 1, title: 'Omletă', ingredients: 'Ouă, sare, piper', instructions: 'Amestecă și prăjește.' },
    { id: 2, title: 'Salată Caesar', ingredients: 'Lapte, pâine, salată', instructions: 'Taie și amestecă.' },
  ];

  constructor() {}

  // Obține toate rețetele
  getRecipes(id: number): Observable<any[]> {
    return of(this.recipes); // Returnează un Observable cu array-ul de rețete
  }

  // Adaugă o rețetă nouă
  addRecipe(recipe: any): Observable<any> {
    const newRecipe = { id: this.recipes.length + 1, ...recipe };
    this.recipes.push(newRecipe);
    return of(newRecipe); // Returnează noua rețetă
  }

  // Actualizează o rețetă existentă
  updateRecipe(id: number, recipe: any): Observable<any> {
    const index = this.recipes.findIndex((r) => r.id === id);
    if (index !== -1) {
      this.recipes[index] = { ...this.recipes[index], ...recipe };
      return of(this.recipes[index]); // Returnează rețeta actualizată
    }
    return of(null); // Returnează null dacă rețeta nu există
  }

  // Șterge o rețetă
  deleteRecipe(id: number): Observable<any> {
    this.recipes = this.recipes.filter((r) => r.id !== id);
    return of({ success: true }); // Returnează un obiect de confirmare
  }
}