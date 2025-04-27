// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Calea corectă
import { map, take } from 'rxjs/operators';

// Guard funcțional (sintaxa modernă)
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Folosim observable-ul pentru a reacționa la schimbările de stare
  return authService.isAuthenticated$.pipe(
    take(1), // Luăm doar prima valoare emisă pentru decizia curentă
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Permite accesul la rută
      } else {
        // Nu este autentificat, redirectează la login
        console.log('AuthGuard: User not authenticated, redirecting to login.');
        // Poți salva URL-ul la care dorea să ajungă pentru redirectare după login
        // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        router.navigate(['/login']);
        return false; // Blochează accesul la rută
      }
    })
  );
};