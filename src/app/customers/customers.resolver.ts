/**
 * CE FICHIER DECRIT UN RESOLVER DE LA LISTE DE CUSTOMERS
 * -------------------
 * Le but d'un resolver c'est d'aller chercher des données en amont afin de les fournir
 * à un composant qui en aura besoin. On n'affiche le composant qu'une fois que toutes les données
 * ont été "résolues" (récupérées) et qu'elles sont prêtes à l'emploi.
 */

import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Customer } from "./customer";
import { Observable } from "rxjs";
import { CustomersService } from "./customers.service";

@Injectable({
  // Disponible dans toute l'application
  providedIn: "root"
})
export class CustomersResolver implements Resolve<Customer[]> {
  /**
   * Injection de dépendances
   * @param service Le service des customers, qui permettra d'aller chercher la liste des customers
   */
  constructor(private service: CustomersService) {}

  /**
   * Cette fonction est ultra simple : elle va chercher via l'API la liste des customers et nous retourne
   * l'observable correspondant.
   *
   * Quand l'observable détectera la fin de la requête HTTP, alors les données seront transmises au composant
   *
   * @param route La photo de la route actuelle
   * @param state L'état actuel du router
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Customer[] | Observable<Customer[]> | Promise<Customer[]> {
    return this.service.findAll();
  }
}
