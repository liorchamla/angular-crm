import { Component, OnInit } from "@angular/core";
import { Customer } from "../customer";
import { CustomersService } from "../customers.service";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { UiService } from "src/app/ui/ui.service";

@Component({
  selector: "app-customer-view",
  template: `
    <div class="row" *ngIf="customer">
      <div class="col-4">
        <div class="alert alert-light">
          <h2>Détails de {{ customer.firstName }} {{ customer.lastName }}</h2>
          <hr />
          <p><strong>Email : </strong> {{ customer.email }}</p>
          <p>
            <strong>Factures : </strong>
            {{ customer.invoices ? customer.invoices.length : 0 }}
          </p>
          <p>
            <strong>Total facturé : </strong>
            {{ customer.totalAmount | currency: "EUR":"symbol" }}
          </p>
          <p>
            <strong>Reste à payer : </strong>
            {{ customer.unpaidAmount | currency: "EUR":"symbol" }}
          </p>

          <hr />
          <a
            routerLink="/customers/{{ customer.id }}/edit"
            class="btn btn-primary text-white"
          >
            Modifier
          </a>
          <a routerLink="/customers" class="btn btn-link">Revenir à la liste</a>
        </div>
      </div>
      <div class="col-8">
        <div class="alert alert-light">
          <h2>Factures de {{ customer.firstName }}</h2>

          <table class="table table-hover">
            <thead>
              <tr>
                <th>Num.</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let i of customer.invoices">
                <td>{{ i.id }}</td>
                <td>{{ i.amount | currency: "EUR":"symbol" }}</td>
                <td>{{ i.sentAt | date: "dd/MM/yyyy" }}</td>
                <td>
                  <span class="badge badge-{{ getStatusClass(i.status) }}">
                    {{ getStatusLabel(i.status) }}
                  </span>
                </td>
                <td>
                  <a href="" class="btn btn-link">Voir</a>
                  <button class="btn btn-link">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CustomerViewComponent implements OnInit {
  customer: Customer;

  constructor(private ui: UiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.customer = this.route.snapshot.data.apiCustomer;
  }

  getStatusLabel(status: string) {
    return this.ui.getInvoiceStatusLabel(status);
  }

  getStatusClass(status: string) {
    return this.ui.getInvoiceStatusBadge(status);
  }
}
