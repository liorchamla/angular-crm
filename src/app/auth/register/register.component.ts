import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { UiService } from "src/app/ui/ui.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  template: `
    <h2>Créer un compte</h2>
    <form [formGroup]="form" (ngSubmit)="handleSubmit()">
      <div class="form-group">
        <input
          type="email"
          formControlName="email"
          class="form-control"
          placeholder="Adresse email"
        />
        <p *ngIf="email.hasError('violation')">
          {{ email.getError("violation") }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="password"
          formControlName="password"
          class="form-control"
          placeholder="Mot de passe"
        />
        <p *ngIf="password.hasError('violation')">
          {{ password.getError("violation") }}
        </p>
      </div>
      <div class="form-group">
        <input
          type="url"
          formControlName="avatar"
          class="form-control"
          placeholder="URL de votre avatar"
        />
        <p *ngIf="avatar.hasError('violation')">
          {{ avatar.getError("violation") }}
        </p>
      </div>

      <div class="alert alert-danger" *ngIf="error">
        Une erreur inconnue est survenue :'(
      </div>

      <button type="submit" class="btn btn-success">Inscription !</button>
    </form>
  `,
  styles: []
})
export class RegisterComponent implements OnInit {
  error = false;
  form = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
    avatar: new FormControl("")
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private ui: UiService
  ) {}

  ngOnInit() {}

  get email() {
    return this.form.get("email");
  }

  get password() {
    return this.form.get("password");
  }

  get avatar() {
    return this.form.get("avatar");
  }

  handleSubmit() {
    this.ui.activateLoading();

    this.auth.register(this.form.value).subscribe(
      () => {
        this.ui.deactivateLoading();
        this.router.navigateByUrl("/login");
      },
      (httpError: HttpErrorResponse) => {
        this.ui.deactivateLoading();

        if (httpError.status === 400) {
          // Violations
          const violations = httpError.error.violations as Violation[];

          for (let apiViolation of violations) {
            this.form.get(apiViolation.propertyPath).setErrors({
              violation: apiViolation.message
            });
          }

          return;
        }

        // Autre soucis
        this.error = true;
      }
    );
  }
}

export interface Violation {
  propertyPath: string;
  message: string;
}
