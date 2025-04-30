import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../../core/services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';   

@Component({
  selector: 'app-recipe-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;
  recipeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipeForm = this.fb.group({
      title : ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: [''],
      ingredients: this.fb.array([
        this.fb.control('', Validators.required)
      ]),
      instructions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      this.isEditMode = true;
      this.recipeService.getRecipeById(this.recipeId).subscribe({
        next: (recipe) => {
          this.recipeForm.patchValue({
            title: recipe.title,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            instructions: recipe.instructions
          });

          this.ingredients.clear();

          const parsedIngredients = Array.isArray(recipe.ingredients)
            ? recipe.ingredients
            : JSON.parse(recipe.ingredients);

          parsedIngredients.forEach((ing: string) => {
            this.ingredients.push(this.fb.control(ing, Validators.required));
          });
        },
        error: (err) => {
          console.error('Eroare la încărcarea rețetei pentru editare:', err);
        }
      });
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get ingredientsControls() {
    return this.ingredients;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control('', Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const recipeData = {
        ...this.recipeForm.value,
        ingredients: JSON.stringify(this.recipeForm.value.ingredients)
      };

      if (this.isEditMode && this.recipeId) {
        this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe({
          next: () => {
            alert('Rețetă actualizată cu succes!');
            this.router.navigate(['/recipes']);
          },
          error: (err) => {
            console.error('Eroare la actualizare rețetă:', err);
            alert('Eroare la actualizarea rețetei.');
          }
        });
      } else {
        this.recipeService.createRecipe(recipeData).subscribe({
          next: () => {
            alert('Rețetă creată cu succes!');
            this.router.navigate(['/recipes']);
          },
          error: (err) => {
            console.error('Eroare la adăugare rețetă:', err);
          }
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/recipes']);
  }
}
