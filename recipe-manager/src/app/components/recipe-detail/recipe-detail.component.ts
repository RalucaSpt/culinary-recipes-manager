import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe, RecipeService } from '../../services/recipe.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  recipe$!: Observable<Recipe>;

  ngOnInit(): void {
    // Obține id-ul din rută și apoi încarcă rețeta
    this.recipe$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          throw new Error('ID-ul rețetei lipsește din rută'); // Sau gestionează altfel
        }
        return this.recipeService.getRecipeById(id);
      })
    );
  }
}