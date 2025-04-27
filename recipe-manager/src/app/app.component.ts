// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common'; // Import CommonModule pt *ngIf, async
import { AuthService } from './core/services/auth.service'; // Calea corectă
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  // Adaugă CommonModule și RouterLink
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Sau .scss
})
export class AppComponent {
  title = 'recipe-app-frontend'; // Sau numele tău
  authService = inject(AuthService); // Injectează serviciul

  // Expune observable-ul pentru a fi folosit în template cu async pipe
  isAuthenticated$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  logout(): void {
    this.authService.logout();
  }
}