// src/app/core/services/recipe.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Tipul corect pentru o rețetă, conform bazei de date și frontendului
export interface Recipe {
  id: string | number;
  title: string;
  description: string;
  ingredients: string; // JSON string care va fi parsată în frontend
  instructions: string;
  imageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private apiUrl =  '/api/recipes';

  constructor() { }

  // Obține toate rețetele
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // Obține o rețetă după ID
  getRecipeById(id: string | number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Creează o rețetă nouă
  createRecipe(recipeData: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipeData);
  }

  // Actualizează o rețetă
  updateRecipe(id: string | number, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipeData);
  }

  // Șterge o rețetă
  deleteRecipe(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
