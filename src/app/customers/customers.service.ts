/**
 * CE FICHIER MET EN PLACE LE SERVICE D'ACCES AUX CUSTOMERS :
 * --------------
 * Le but du service est de contenir les détails de l'accès aux customers sur l'API afin
 * que les composants n'aient pas à gérer cet aspect là des choses : les composants délèguent au service
 * les tâches d'accès aux données.
 *
 * On peut donc cacher la complexité des choses (requête HTTP, transformations éventuelles, etc) ici et
 * offrir une interface simple aux composants (findAll, find, create, update etc)
 */

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { Customer } from "./customer";

// L'adresse de l'API se trouve dans la variable d'environnement
const CUSTOMERS_API = environment.CUSTOMERS_API;

@Injectable({
  // Utilisable dans toute l'application
  providedIn: "root"
})
export class CustomersService {
  /**
   * Injection de dépendance via le constructeur
   * @param http Le client Http qui permettra de faire des requêtes HTTP
   *
   * Rappel : pour accéder à l'API des customers, il faut un token. Or on voit bien qu'on n'en parle
   * jamais ici même. Comment cela se fait il ? Tout simplement grâce à l'intercepteur HTTP mis en place
   * dans le module AuthModule (AuthInterceptor) et qui injecte lui même le token dans la requête HTTP
   */
  constructor(private http: HttpClient) {}

  /**
   * Permet de récupérer tous les customers
   */
  public findAll() {
    return (
      this.http
        .get(CUSTOMERS_API)
        // On transforme le résultat de l'API en un tableau de customers
        // L'API nous renvoie un objet riche, dont la propriété hydra:member représente le tableau de
        // customers.
        // On se fout de tout le reste, donc on transforme le gros objet en extrayant uniquement le tableau
        // qui nous intéresse.
        .pipe(map(data => data["hydra:member"] as Customer[]))
    );
  }

  /**
   * Permet de récupérer un customer en particulier
   * @param id L'identifiant du customer qu'on recherche
   */
  public find(id: number) {
    return this.http.get<Customer>(CUSTOMERS_API + "/" + id);
  }

  /**
   * Permet de créer un customer sur l'API
   * @param customer L'objet customer que l'on souhaite créer
   */
  public create(customer: Customer) {
    return this.http.post<Customer>(CUSTOMERS_API, customer);
  }

  /**
   * Permet de mettre à jour un customer sur l'API
   * @param customer L'objet customer que l'on souhaite mettre à jour
   */
  public update(customer: Customer) {
    /**
     * Attention, le customer qu'on reçoit est un objet assez riche qui contient pas mal d'informations
     * non pertinentes pour une mise à jour sur l'API
     * On va donc créer un objet plus limité, en extrayant uniquement les données intéressantes
     */
    const updatedCustomer = {
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email
    };

    return this.http.put<Customer>(
      CUSTOMERS_API + "/" + customer.id,
      updatedCustomer
    );
  }
}
