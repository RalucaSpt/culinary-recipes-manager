import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../../core/services/recipe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})

export class RecipeFormComponent {
  recipeForm: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) {
    // AICI creezi formularul corect:
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      ingredients: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      instructions: ['', Validators.required]
    });
  }

  get ingredientsControls() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredientsControls.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredientsControls.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipeData = this.recipeForm.value;
  
      this.recipeService.createRecipe(recipeData).subscribe({
        next: (response) => {
          console.log('Rețetă creată:', response);
  
          // Evită router.navigate ca să vedem dacă eroarea dispare
          setTimeout(() => {
            alert('Rețetă salvată cu succes! Verifică lista.');
          }, 100);
  
          // this.router.navigate(['/recipes']); ← lasă-l comentat de test
        },
        error: (error) => {
          console.error('Eroare la adăugare rețetă:', error);
        }
      });
    }
  }
  
  cancel() {
    this.router.navigate(['/recipes']);
  }
}
