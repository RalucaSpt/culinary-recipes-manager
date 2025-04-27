// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Calea corectă

// Interceptor funcțional (sintaxa modernă)
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Verifică dacă request-ul este către API-ul nostru (opțional, dar recomandat)
  // și dacă există un token
  // const isApiUrl = req.url.startsWith('/api'); // Ajustează dacă e necesar

  if (authToken /*&& isApiUrl*/) {
    // Clonează request-ul și adaugă header-ul Authorization
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}` // Standardul 'Bearer' token
      }
    });
    // Trimite request-ul clonat mai departe
    return next(authReq);
  } else {
    // Dacă nu e token sau nu e request către API, trimite request-ul original
    return next(req);
  }
};