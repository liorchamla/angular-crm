/**
 * CE FICHIER DECRIT LE MODULE DES CUSTOMERS
 * -----------------
 * Il importe le SharedModule et comprend donc CommonModule, ReactiveFormsModule et HttpClientModule
 * Il met en place les routes et composants qui permettent de gérer les customers (CRUD)
 *
 * Il utilise notamment le AuthGuard qui permettra de s'assurer que certaines routes ne seront accessibles
 * que si l'utilisateur est authentifié.
 *
 * Il utilise aussi deux Résolvers dont le but sera d'aller chercher les données en ligne avant d'afficher une page
 * ils permettront donc de ne pas avoir de pages qui s'affichent "en deux fois" (une fois sans données, puis une fois
 * les données chargées, une autre mise en page se met en place).
 */

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";
import { UiModule } from "../ui/ui.module";
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerViewComponent } from "./customer-view/customer-view.component";
import { CustomerResolver } from "./customer.resolver";
import { CustomersResolver } from "./customers.resolver";
import { CustomersComponent } from "./customers/customers.component";

/**
 * Rappel :
 * - canActivate : permet de désigner un Guard qui pourra décider si la route peut être chargée ou pas
 * - resolve : permet de désigner un ou plusieurs résolvers qui iront chercher les données nécessaires au composant
 * avant même que le composant ne soit affiché
 */
const routes: Routes = [
  {
    path: "customers/new",
    component: CustomerFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "customers/:id/edit",
    component: CustomerFormComponent,
    canActivate: [AuthGuard],
    resolve: { apiCustomer: CustomerResolver }
  },
  {
    path: "customers/:id",
    component: CustomerViewComponent,
    canActivate: [AuthGuard],
    resolve: { apiCustomer: CustomerResolver }
  },
  {
    path: "customers",
    component: CustomersComponent,
    canActivate: [AuthGuard],
    resolve: { apiCustomers: CustomersResolver }
  }
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerFormComponent,
    CustomerViewComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes), UiModule],
  exports: [RouterModule]
})
export class CustomersModule {}
