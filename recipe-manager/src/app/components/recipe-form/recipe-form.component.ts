import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  imports: [MatFormFieldModule, ReactiveFormsModule],
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;
  recipeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.recipeId = +params['id'];
        this.loadRecipe(this.recipeId);
      }
    });
  }

  loadRecipe(id: number): void {
    this.recipeService.getRecipes(id).subscribe(
      (recipe) => {
        this.recipeForm.patchValue(recipe);
      },
      (error) => console.error('Eroare la încărcarea rețetei:', error)
    );
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) return;

    const recipeData = this.recipeForm.value;

    if (this.isEditMode && this.recipeId) {
      this.recipeService.updateRecipe(this.recipeId, recipeData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error('Eroare la actualizarea rețetei:', error)
      );
    } else {
      this.recipeService.addRecipe(recipeData).subscribe(
        () => this.router.navigate(['/']),
        (error) => console.error('Eroare la adăugarea rețetei:', error)
      );
    }
  }
}