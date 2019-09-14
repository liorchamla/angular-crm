/**
 * CE FICHIER GERE LES ROUTES DE L'APPLICATION
 * ---------------
 * Là aussi, ça peut sembler bizarre mais il ne met finalement en place que deux routes principales :
 * - la page d'accueil
 * - la page 404
 *
 * Les autres routes sont gérées par les modules eux mêmes (CustomersModule et AuthModule)
 */

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { CustomersModule } from "./customers/customers.module";
import { Error404Component } from "./error404/error404.component";

const routes: Routes = [
  { path: "", redirectTo: "/customers", pathMatch: "full" },
  { path: "**", component: Error404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // Gère ses propres routes
    CustomersModule,
    // Gère ses propres routes aussi
    AuthModule,
    CommonModule
  ],
  exports: [RouterModule],
  declarations: [Error404Component]
})
export class AppRoutingModule {}
