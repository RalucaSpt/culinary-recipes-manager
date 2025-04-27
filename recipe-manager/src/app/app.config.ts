import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Configurează HttpClient pentru a folosi interceptorul
    provideHttpClient(
      withInterceptors([authInterceptor]) // Adaugă interceptorul aici
    )  
  ]
  };
