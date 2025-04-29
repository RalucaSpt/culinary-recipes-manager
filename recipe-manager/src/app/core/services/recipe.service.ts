// src/app/core/services/recipe.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definește tipul pentru o rețetă
export interface Recipe {
  id: string | number;     // <-- Asta e cheia
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/recipes'; // URL complet backend

  constructor() { }

  // Obține toate rețetele
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // Obține o rețetă după ID
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Creează o rețetă nouă
  createRecipe(recipeData: Omit<Recipe, '_id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipeData);
  }

  // Actualizează o rețetă
  updateRecipe(id: string, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipeData);
  }

  // Șterge o rețetă
  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
