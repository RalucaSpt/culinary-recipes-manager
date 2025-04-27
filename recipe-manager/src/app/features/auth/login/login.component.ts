// src/app/features/auth/login/login.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'; // Calea corectă

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Adaugă RouterLink
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Sau .scss
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      // Presupunem login cu email, ajustează dacă folosești username
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading = false;
        // Redirectare după login reușit
        this.router.navigate(['/recipes']); // Sau altă pagină dorită
      },
      error: (err) => {
        this.isLoading = false;
        // Afișează un mesaj de eroare generic sau specific (depinde de răspunsul API)
        this.errorMessage = err.error?.message || 'Autentificare eșuată. Verificați datele.';
        console.error('Login error:', err);
      }
    });
  }
}