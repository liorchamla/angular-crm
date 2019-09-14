import { Component, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-error404",
  template: `
    <div class="alert alert-warning">
      <h2>Oops, la page recherchée n'existe pas !</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        autem dolor, odio eveniet eligendi aliquam asperiores mollitia quae
        voluptates quas.
      </p>
    </div>
    <h2>
      L'adresse <strong>{{ currentUrl }}</strong> ne mène nulle part
    </h2>

    <div *ngIf="proposition">
      Aviez vous pensé à
      <a routerLink="{{ proposition }}">{{ proposition }}</a> ?
    </div>
  `,
  styles: []
})
export class Error404Component implements OnInit {
  currentUrl = window.location.pathname;
  proposition: string;

  constructor() {}

  ngOnInit() {
    if (
      this.currentUrl.includes("cus") ||
      this.currentUrl.includes("omer") ||
      this.currentUrl.includes("ustom")
    ) {
      this.proposition = "/customers";
    }
  }
}
