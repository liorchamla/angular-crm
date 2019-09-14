/**
 * CE FICHIER GERE LE MODULE D'AUTHENTIFICATION
 * --------------------
 * On a rangé dans le AuthModule tous les composants et services utilisés en ce qui concerne l'authentification et
 * l'inscription des utilisateurs :
 * - Deux composants : Login et Register
 * - Deux fournisseurs de service :
 * -- Un intercepteur HTTP qui sera chargé d'injecter le token JWT dans les requêtes HTTP qu'on envoie
 * -- Un objet qui agira comme un Storage pour stocker côté navigateur le token JWT
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { AuthInterceptor } from "./auth.interceptor";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  /**
   * Magnifique système de providers qui permettent de signifier à l'injecteur de dépendances que :
   * - Quand quelqu'un demande un service de type HTTP_INTERCEPTORS, on lui donnera alors le AuthInterceptor
   * - Quand quelqu'un demande un service de type Storage, on lui donnera alors le window.localStorage
   *
   * Notez que pour l'intercepteur, on utilise "useClass" car on précise une classe, pas un objet
   * A l'inverse, pour le storage, on utilise "useValue" car on précise un objet déjà existant, pas une classe
   */
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: Storage,
      useValue: window.localStorage
    }
  ]
})
export class AuthModule {}
