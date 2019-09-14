import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../customer";

@Component({
  selector: "app-customers",
  template: `
    <div class="alert alert-primary">
      <h2>Vos clients</h2>
      Vous pouvez gérer vos clients via cet écran, et n'hésitez pas non plus à
      les ajouter dès que vous les rencontrez afin de mieux les suivre !
      <hr />
      <a routerLink="/customers/new" class="btn btn-info">Ajouter un client</a>
    </div>

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Client</th>
          <th>Email</th>
          <th>Factures</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of customers">
          <td>{{ c.id }}</td>
          <td>
            <a routerLink="/customers/{{ c.id }}"
              >{{ c.firstName }} {{ c.lastName }}</a
            >
          </td>
          <td>{{ c.email }}</td>
          <td class="text-center">
            <span class="badge badge-info">{{ c.invoices.length }}</span>
          </td>
          <td>
            <button class="btn btn-danger btn-sm">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.customers = this.route.snapshot.data.apiCustomers;
  }
}
