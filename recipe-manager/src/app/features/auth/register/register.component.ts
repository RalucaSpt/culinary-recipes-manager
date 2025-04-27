// src/app/features/auth/register/register.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'; // Calea corectă

// Funcție Validator Custom pentru potrivirea parolelor
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // Verifică dacă ambele câmpuri există și dacă au fost modificate (pentru a nu afișa eroarea imediat)
  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null; // Nu valida dacă unul din câmpuri lipsește
  }

  // Returnează eroare dacă parolele nu coincid
  return password.value === confirmPassword.value ? null : { passwordsMismatch: true };
};


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Adaugă RouterLink
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Sau .scss
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // Poți adăuga și 'username' dacă este necesar pentru backend
      // username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Exemplu: minim 6 caractere
      confirmPassword: ['', Validators.required]
    }, {
      // Adaugă validatorul custom la nivel de grup pentru potrivirea parolelor
      validators: passwordMatchValidator
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    // Extrage datele, excluzând confirmPassword
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Înregistrare reușită! Acum te poți autentifica.';
        // O opțiune este să redirectezi la login după un scurt timp
        // Sau poți afișa mesajul și lăsa utilizatorul să navigheze manual
        setTimeout(() => {
           if (!this.errorMessage) { // Verifică din nou în caz că o eroare apare între timp
                this.router.navigate(['/login']);
            }
        }, 2000); // Redirectează după 2 secunde
      },
      error: (err) => {
        this.isLoading = false;
        // Afișează mesajul de eroare de la backend (ex: email deja folosit)
        this.errorMessage = err.error?.message || 'Înregistrarea a eșuat. Te rugăm să încerci din nou.';
        console.error('Register error:', err);
      }
    });
  }

  // Getter util pentru a verifica eroarea de potrivire a parolelor în template
  get passwordsMismatchError(): boolean {
    return this.registerForm.errors?.['passwordsMismatch'] &&
           (this.registerForm.get('confirmPassword')?.touched ?? false);
  }
}