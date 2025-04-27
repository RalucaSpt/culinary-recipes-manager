// src/app/features/recipes/recipe-form/recipe-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importă ReactiveFormsModule direct aici dacă nu e global
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  // Adaugă ReactiveFormsModule în imports
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  recipeForm!: FormGroup;
  isEditMode = false;
  recipeId: string | null = null;

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: this.fb.array([]), // Vom adăuga ingrediente dinamic
      instructions: ['', Validators.required],
      imageUrl: ['']
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        this.recipeId = params.get('id');
        if (this.recipeId) {
          this.isEditMode = true;
          return this.recipeService.getRecipeById(this.recipeId);
        }
        return EMPTY; // Oprește stream-ul dacă nu e ID (mod creare)
      })
    ).subscribe(recipe => {
      // Populează formularul cu datele existente pentru editare
      this.recipeForm.patchValue(recipe);
      // Populează FormArray-ul pentru ingrediente
      recipe.ingredients.forEach(ingredient => this.addIngredient(ingredient));
    });

     // Adaugă cel puțin un câmp de ingredient inițial dacă e mod creare
     if (!this.isEditMode) {
       this.addIngredient();
     }
  }

  // Getter pentru acces facil la FormArray în template
  get ingredientsControls(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // Metodă pentru a adăuga un nou control de ingredient în FormArray
  addIngredient(initialValue: string = ''): void {
    this.ingredientsControls.push(this.fb.control(initialValue, Validators.required));
  }

  // Metodă pentru a șterge un ingredient din FormArray
  removeIngredient(index: number): void {
    this.ingredientsControls.removeAt(index);
  }


  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched(); // Marchează câmpurile ca atinse pentru a afișa erorile
      return;
    }

    const recipeData = this.recipeForm.value;

    if (this.isEditMode && this.recipeId) {
      // Mod Editare
      this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe({
        next: (updatedRecipe) => {
          console.log('Rețetă actualizată:', updatedRecipe);
          this.router.navigate(['/recipes', this.recipeId]); // Navighează la detalii
        },
        error: (err) => console.error('Eroare la actualizare:', err)
      });
    } else {
      // Mod Creare
      this.recipeService.createRecipe(recipeData).subscribe({
        next: (newRecipe) => {
          console.log('Rețetă creată:', newRecipe);
          this.router.navigate(['/recipes', newRecipe._id]); // Navighează la detalii
        },
        error: (err) => console.error('Eroare la creare:', err)
      });
    }
  }

  cancel(): void {
     if (this.isEditMode && this.recipeId) {
         this.router.navigate(['/recipes', this.recipeId]);
     } else {
         this.router.navigate(['/recipes']);
     }
  }
}