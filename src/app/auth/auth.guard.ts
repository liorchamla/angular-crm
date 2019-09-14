/**
 * CE FICHIER DECRIT UN GUARD :
 * --------------
 * Le but d'un guard est de "garder" une route, afin de dire si l'utilisateur peut y accéder ou pas.
 *
 * Ici le but est de dire que si l'utilisateur n'est pas connecté, le guard ne le laissera pas passer
 */

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
  // Utilisable dans toute l'application
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  /**
   * Injection de dépendances
   * @param auth Le service d'auth qui permettra de savoir si on est connecté ou pas
   * @param router Le router qui permettra de naviguer si nécessaire
   */
  constructor(private auth: AuthService, private router: Router) {}

  /**
   * C'est cette fonction qui sera appelée et qui devra statuer : peut on aller sur une route ou pas ?
   * @param next La photo de la route actuelle
   * @param state La photo de l'état du router
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Si on est authentifié, on peut passer (true)
    if (this.auth.isAuthenticated()) {
      return true;
    }

    // Sinon, on est redirigé vers le formulaire de login
    this.router.navigateByUrl("/login");
    // Et on retourne false pour bien faire comprendre à Angular que la route n'est pas accessible en l'état
    return false;
  }
}
