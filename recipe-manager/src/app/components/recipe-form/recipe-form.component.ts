import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent {
  @Output() recipeSubmitted = new EventEmitter<any>();

  recipeForm: FormGroup;
  ingredients: string[] = [];

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredient: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  addIngredient(input: HTMLInputElement): void {
    const ingredient = input.value.trim();
    if (ingredient && !this.ingredients.includes(ingredient)) {
      this.ingredients.push(ingredient);
      input.value = '';
    }
  }

  removeIngredient(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const newRecipe = {
        title: this.recipeForm.value.title,
        ingredients: this.ingredients,
        instructions: this.recipeForm.value.instructions,
      };
      this.recipeSubmitted.emit(newRecipe);
      this.recipeForm.reset();
      this.ingredients = [];
    }
  }
}