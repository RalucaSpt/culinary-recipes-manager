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

  // URL-uri către API-ul de backend (ajustează dacă backend-ul tău are altă adresă)
  private apiUrl = 'http://localhost:3001/api/auth'; // Updated to point to the backend running on localhost:3000

  // BehaviorSubject pentru a stoca și emite starea de autentificare
  // Inițial, presupunem că nu este autentificat, dar verificăm sesiunea în constructor
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable(); // Expune ca Observable

  constructor() {
    this.checkSession(); // Verificăm dacă utilizatorul este deja logat la pornirea aplicației
  }

  // --- Metode Principale ---

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData, { withCredentials: true });
    // Cu withCredentials: true trimitem cookie-ul de sesiune
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap(() => {
        // La succes, actualizăm starea de autentificare
        this._isAuthenticated.next(true);
      })
      // Gestionarea erorilor se face în componentă de obicei
    );
  }

  logout(): void {
    // Logout utilizator
    this.http.get(`${this.apiUrl}/logout`, { withCredentials: true }).subscribe({
      next: () => {
        // La succes, actualizăm starea de autentificare
        this._isAuthenticated.next(false);
        // Redirectează la pagina de login (sau pagina principală)
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  private checkSession(): void {
    // Verifică dacă există o sesiune activă
    this.http.get<{ userId: number }>(`${this.apiUrl}/me`, { withCredentials: true }).subscribe({
      next: (response) => {
        if (response?.userId) {
          // Dacă userId există, considerăm că utilizatorul este autentificat
          this._isAuthenticated.next(true);
        }
      },
      error: () => {
        // Dacă nu există sesiune validă, considerăm că utilizatorul nu este autentificat
        this._isAuthenticated.next(false);
      }
    });
  }

  // --- Getter Util ---

  isLoggedIn(): boolean {
    // Metodă sincronă utilă pentru verificări rapide, dar folosește isAuthenticated$ pentru reactivitate
    return this._isAuthenticated.getValue();
  }
}
