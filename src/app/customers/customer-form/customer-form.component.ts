/**
 * CE FICHIER DECRIT LE COMPOSANT DE CREATION / MISE A JOUR D'UN CUSTOMER
 * ---------------------
 * C'est un exemple parmi d'autres de formulaire réactif.
 *
 * Chose notable : ce composant ne se sert pas lui même du service des customers pour aller chercher un customer
 * C'est le resolver qui donnera la donnée attendue directement dans la Route
 */

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../customer";
import { CustomersService } from "../customers.service";

@Component({
  selector: "app-customer-form",
  template: `
    <div class="alert alert-primary">
      <h2>{{ customer ? "Modifier un client" : "Créer une client" }}</h2>
      <p *ngIf="!customer">
        Utilisez ce formulaire pour ajouter un nouveau client à votre base
        clients !
      </p>
      <p *ngIf="customer">
        Utilisez ce formulaire pour ajouter modifier le client !
      </p>
    </div>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          formControlName="firstName"
          type="text"
          class="form-control"
          [class.is-invalid]="hasViolation('firstName')"
          placeholder="Prénom du client"
        />

        <div class="invalid-feedback" *ngIf="hasViolation('firstName')">
          {{ getViolationMessage("firstName") }}
        </div>
      </div>
      <div class="form-group">
        <input
          formControlName="lastName"
          type="text"
          class="form-control"
          [class.is-invalid]="hasViolation('lastName')"
          placeholder="Nom de famille du client"
        />
        <div class="invalid-feedback" *ngIf="hasViolation('lastName')">
          {{ getViolationMessage("lastName") }}
        </div>
      </div>
      <div class="form-group">
        <input
          formControlName="email"
          type="email"
          class="form-control"
          [class.is-invalid]="hasViolation('email')"
          placeholder="Adresse email du client"
        />
        <div class="invalid-feedback" *ngIf="hasViolation('email')">
          {{ getViolationMessage("email") }}
        </div>
      </div>

      <div class="alert alert-danger" *ngIf="error">
        Nous n'avons pas pu sauvegarder votre client, veuillez ré-essayer plus
        tard.
      </div>

      <button type="submit" class="btn btn-success">
        {{ customer ? "Enregistrer les modifications" : "Créer le client" }}
      </button>
      <a routerLink="/customers" class="btn btn-link">
        Annuler et revenir à la liste
      </a>
    </form>
  `,
  styles: []
})
export class CustomerFormComponent implements OnInit {
  /**
   * Représentation du formulaire
   */
  form: FormGroup;

  /**
   * Permet d'afficher ou pas un message d'erreur dans la page
   */
  error = false;

  /**
   * Le customer qu'on veut éventuellement modifier (et dont on veut extraire)
   * les données dans le formulaire
   */
  customer: Customer;

  /**
   * Injection de dépendances
   *
   * @param service Le service qui permet d'aller chercher un customer et de sauver / mettre à jour le customer
   * @param router Le router qui va permettre de naviguer sur une autre route à la fin
   * @param route La route actuelle sur laquelle on se trouvé
   */
  constructor(
    private service: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // A l'initialisation, on récupère le customer que nous donne le résolver
    this.customer = this.route.snapshot.data.apiCustomer;
    // On initialise le formulaire
    this.initiliazeForm();
  }

  initiliazeForm() {
    // On met en place le formulaire avec 3 champs
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    });

    // Si on a un customer, on rempli le formulaire avec les données du customer
    if (this.customer)
      this.form.setValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email
      });
  }

  /**
   * Gestion d'une erreur HTTP dans notre composant
   * @param httpError L'erreur HTTP survenue
   */
  handleHttpError(httpError) {
    // Si ce n'est pas des violations du formulaire
    // Plus un problème de connexion / serveur
    if (!httpError.error.violations) {
      this.error = true;
      return;
    }

    // Si c'est un soucis sur les données du formulaire
    this.error = false;
    for (let violation of httpError.error.violations) {
      const { propertyPath, message } = violation;

      this.form.get(propertyPath).setErrors({
        violation: message
      });
    }
  }

  /**
   * Gestion de la soumission du fomulaire
   */
  handleSubmit() {
    // Si il y a un customer, on update
    if (this.customer) {
      // On va fusionner le customer reçu à la base avec les nouvelles données du formulaire
      const customer = { ...this.customer, ...this.form.value };

      this.service.update(customer).subscribe(
        // Si il y a un succès, on redirige
        () => this.router.navigateByUrl("/customers/" + customer.id),
        // Si il y a une erreur, il faut la gérer
        httpError => this.handleHttpError(httpError)
      );

      return;
    }

    // Sinon on create
    this.service.create(this.form.value).subscribe(
      // Si succès, on redirige
      customer => this.router.navigateByUrl("/customers/" + customer.id),
      // Si erreur, on gère l'erreur
      httpError => this.handleHttpError(httpError)
    );
  }

  /**
   * Permet de savoir si un champ a une "violation" venue de l'API ou pas
   * @param fieldName Le nom du champ
   */
  hasViolation(fieldName: string) {
    return this.form.get(fieldName).hasError("violation");
  }

  /**
   * Permet de connaître le message d'erreur renvoyé par l'API pour un champ donné
   * @param fieldName Le nom du champ
   */
  getViolationMessage(fieldName: string) {
    return this.form.get(fieldName).getError("violation");
  }
}
