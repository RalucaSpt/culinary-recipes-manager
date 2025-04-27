import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
  @Input() recipes: any[] = [];
  @Output() deleteRecipe = new EventEmitter<number>();

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(recipeId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Sigur doriți să ștergeți această rețetă?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecipe.emit(recipeId);
      }
    });
  }
}