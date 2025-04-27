// src/app/core/services/recipe.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definește interfețe/tipuri pentru datele tale (Rețetă)
export interface Recipe {
  _id: string; // Sau id, depinde de backend
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string; // Opțional
  // Alte proprietăți...
}

@Injectable({
  providedIn: 'root' // Disponibil global în aplicație
})
export class RecipeService {
  private http = inject(HttpClient); // Injectează HttpClient (modern)
  // private apiUrl = 'http://localhost:3000/api/recipes'; // URL-ul backend-ului tău - ajustează!
  private apiUrl = '/api/recipes'; // Folosește un proxy sau setează direct URL-ul complet al backendului

  constructor() { }

  // Metodă pentru a obține toate rețetele
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl);
  }

  // Metodă pentru a obține o rețetă după ID
  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // Metodă pentru a crea o nouă rețetă
  createRecipe(recipeData: Omit<Recipe, '_id'>): Observable<Recipe> {
    return this.http.post<Recipe>(this.apiUrl, recipeData);
  }

  // Metodă pentru a actualiza o rețetă
  updateRecipe(id: string, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`, recipeData);
  }

  // Metodă pentru a șterge o rețetă
  deleteRecipe(id: string): Observable<void> { // Sau poate returnează un obiect status
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}