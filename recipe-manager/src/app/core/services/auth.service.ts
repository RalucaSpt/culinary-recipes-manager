// src/app/core/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

// Definește o interfață pentru răspunsul de la login (minim un token)
export interface AuthResponse {
  token: string;
  // Poți adăuga și alte date despre utilizator dacă backend-ul le returnează
  // userId?: string;
  // email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  // URL-uri către API-ul de backend (ajustează!)
  private apiUrl = '/api/auth'; // Presupunem un prefix /api/auth

  // BehaviorSubject pentru a stoca și emite starea de autentificare
  // Inițial, verificăm dacă există un token în localStorage
  private _isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this._isAuthenticated.asObservable(); // Expune ca Observable

  constructor() { }

  // --- Metode Principale ---

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
    // Nu stocăm token la register de obicei, userul trebuie să facă login
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // La succes, salvăm token-ul și actualizăm starea
        this.saveToken(response.token);
        this._isAuthenticated.next(true);
      })
      // Gestionarea erorilor se face în componentă de obicei
    );
  }

  logout(): void {
    // Șterge token-ul și actualizează starea
    this.removeToken();
    this._isAuthenticated.next(false);
    // Redirectează la pagina de login (sau pagina principală)
    this.router.navigate(['/login']);
  }

  // --- Gestionare Token (LocalStorage - Atenție la Securitate!) ---

  private saveToken(token: string): void {
    // ATENȚIE: Stocarea JWT în localStorage este vulnerabilă la atacuri XSS.
    // Alternative mai sigure includ cookie-uri HttpOnly (setate de backend)
    // sau stocarea în memorie combinată cu refresh tokens.
    // Pentru simplitate, folosim localStorage aici.
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private removeToken(): void {
    localStorage.removeItem('authToken');
  }

  private hasToken(): boolean {
    return !!this.getToken(); // Verifică simplu dacă token-ul există
    // O verificare mai bună ar implica și validarea expirării token-ului
  }

  // --- Gettere Utile ---
  isLoggedIn(): boolean {
     // Metodă sincronă utilă pentru verificări rapide, dar folosește isAuthenticated$ pentru reactivitate
    return this._isAuthenticated.getValue();
  }
}