import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" routerLink="/">AngSym CRM</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor03">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" routerLink="/customers">
              Mes clients
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/invoices">Mes factures</a>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/register" class="btn btn-primary mr-1">
              Inscription
            </a>
          </li>
          <li class="nav-item" *ngIf="!isAuthenticated">
            <a routerLink="/login" class="btn btn-success">Connexion</a>
          </li>
          <li class="nav-item" *ngIf="isAuthenticated">
            <a routerLink="/profile" class="nav-link">
              <img
                [src]="userData.avatar"
                alt="Avatar de {{ userData.username }}"
                class="avatar"
              />
              {{ userData.username }}
            </a>
          </li>
          <li class="nav-item" *ngIf="isAuthenticated">
            <button class="btn btn-danger" (click)="handleLogout()">
              Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      img.avatar {
        max-height: 24px;
        max-width: 24px;
        border-radius: 50%;
        margin-right: 10px;
        border: 1px solid #ddd;
      }
    `
  ]
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  userData: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();

    if (this.isAuthenticated) {
      this.userData = this.auth.getUserData();
    }

    this.auth.authState.subscribe(state => {
      this.isAuthenticated = state;

      if (this.isAuthenticated) {
        this.userData = this.auth.getUserData();
      }
    });
  }

  handleLogout() {
    this.auth.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl("/login");
  }
}
