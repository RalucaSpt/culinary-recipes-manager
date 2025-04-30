// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Calea corectă

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authReq = req.clone({
    withCredentials: true // <-- Adaugă cookies în requesturi
  });

  return next(authReq); // <-- Trimite request-ul clonat, nu pe cel original
};

