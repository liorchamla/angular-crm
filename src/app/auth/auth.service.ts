/**
 * CE FICHIER REPRESENTE LE SERVICE D'AUTHENTIFICATION :
 * ----------------------
 * Son but est de centraliser et d'organiser tout ce qui touche aux utilisateurs : authentification, inscription etc.
 *
 * Notamment la gestion du Token JWT qu'il faudra enregistrer, décrypter etc.
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Credentials } from "./credentials";

const USERS_API = environment.USERS_API;
const AUTH_API = environment.AUTH_API;

/**
 * Représentation de la réponse de l'API d'authentification
 */
interface AuthResponse {
  token: string;
}

@Injectable({
  // Utilisable dans toute l'application
  providedIn: "root"
})
export class AuthService {
  /**
   * On met en place un sujet (Subject) qui sera observé par d'autres composants
   * Il pourra prévenir tout le monde d'un changement d'état de l'authentification de l'utilisateur
   * en envoyant la valeur "true" à tout le monde si l'utilisateur s'authentifie ou la valeur "false" à tout le
   * monde si l'utilisateur se déconnecte
   */
  authState = new Subject<boolean>();

  /**
   * Injection de dépendances
   * @param http Le client Http
   * @param storage Le storage à utiliser pour stocker le token JWT en local
   */
  constructor(private http: HttpClient, private storage: Storage) {}

  /**
   * Permet d'inscrire un nouvel utilisateur
   * @param account Un objet représentant les données d'un compte utilisateur
   */
  register(account: { email: string; password: string; avatar: string }) {
    return this.http.post(USERS_API, account);
  }

  /**
   * Permet de s'authentifier auprès de l'API distante
   * @param credentials Les données d'authentification (username et password)
   */
  authenticate(credentials: Credentials) {
    return this.http.post(AUTH_API, credentials).pipe(
      // Ici, on n'utilise pas le transformateur "map" dans le but de transformer la valeur de l'observable
      // mais simplement pour intervenir avant de renvoyer la valeur
      map((resultat: AuthResponse) => {
        // On enregistre le token en local
        this.storage.setItem("token", resultat.token);
        // On prévient tout le monde que l'utilisateur est maintenant connecté
        this.authState.next(true);
        // On retourne le résultat à l'observateur
        return resultat;
      })
    );
  }

  /**
   * Permet de déconnecter l'utilisateur
   */
  logout() {
    // On supprime le token du storage
    this.storage.removeItem("token");
    // On prévient tout le monde que l'utilisateur s'est maintenant déconnecté
    this.authState.next(false);
  }

  /**
   * Permet d'obtenir le token stocké en local (ou null si il n'y en a pas)
   */
  getToken(): string {
    return this.storage.getItem("token") || null;
  }

  /**
   * Permet de savoir facilement si on est authentifié ou pas
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Permet de recevoir les données du token une fois qu'on l'a décodé (fonction jwtDecode du package jwt-decode)
   */
  getUserData() {
    if (!this.getToken()) return null;

    return jwtDecode(this.getToken());
  }
}
