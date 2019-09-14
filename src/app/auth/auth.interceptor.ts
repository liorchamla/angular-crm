/**
 * CE FICHIER DECRIT UN INTERCEPTEUR :
 * --------------
 * Le but d'un intercepteur est d'intercépter une requête HTTP avant qu'elle ne soit réellement envoyée
 * afin d'en modifier le contenu ou les en-têtes !
 *
 * Ici, notre but est d'injecter dans chaque requête HTTP qui part le token JWT afin que l'API puisse
 * nous authentifier et nous donner les ressources qu'on demande
 *
 */

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

// Notez qu'on ne précise pas le providedIn: root ici, on se fout que ce soit disponible dans toute l'application
// On précisera là où c'est nécessaire que l'on souhaite utiliser cet intercepteur ou pas.
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Injection de dépendance
   * @param auth Le service d'auth qui nous donnera le token si nécessaire
   */
  constructor(private auth: AuthService) {}

  /**
   * Très simple : si on est authentifié, on injecte le token dans les en-têtes
   * @param req La requête Http
   * @param next Représente la prochaine étape par laquelle doit passer la requête
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Si on n'est pas connecté, y a rien à injecter donc on renvoi la requête telle quelle.
    if (!this.auth.isAuthenticated()) {
      return next.handle(req);
    }

    // Récupération du token
    const token = this.auth.getToken();

    // La requête n'est pas modifiable, on est donc obligé d'en créer une copie qui sera modifiée à la volée
    const clonedReq = req.clone({
      headers: req.headers.append("Authorization", "Bearer " + token)
    });

    return next.handle(clonedReq);
  }
}
