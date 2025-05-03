import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { DuckService } from "./services/duck.service";
import { routes } from "./app.routes";
import { environment } from "../environments/environment";
import { authInterceptor } from "./interceptors/auth.interceptor";
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const providers = [
  provideRouter(routes),
  DuckService,
  provideHttpClient(withInterceptors([authInterceptor])),
  ...(environment.features.enableAnimations ? [provideAnimations()] : []),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  provideFirestore(() => getFirestore()),
];

export const appConfig: ApplicationConfig = {
  providers,
};
