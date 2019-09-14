/**
 * CE FICHIER DECRIT UN RESOLVER D'UN CUSTOMER PARTICULIER
 * -------------------
 * Le but d'un resolver c'est d'aller chercher des données en amont afin de les fournir
 * à un composant qui en aura besoin. On n'affiche le composant qu'une fois que toutes les données
 * ont été "résolues" (récupérées) et qu'elles sont prêtes à l'emploi.
 */

import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Customer } from "./customer";
import { Observable } from "rxjs";
import { CustomersService } from "./customers.service";

@Injectable({
  // Utilisable dans toute l'application
  providedIn: "root"
})
export class CustomerResolver implements Resolve<Customer> {
  /**
   * Injection de dépendance
   * @param service Le service des customers
   */
  constructor(private service: CustomersService) {}

  /**
   * Fonction ultra simple aussi : on extrait l'identifiant du customer qui se trouve dans la route
   * puis on demande au service d'aller le chercher sur l'API
   *
   * @param route La photo de la route actuelle
   * @param state La photo de l'état du router
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Customer | Observable<Customer> | Promise<Customer> {
    const id = +route.paramMap.get("id");

    return this.service.find(id);
  }
}
