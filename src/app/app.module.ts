/**
 * CE FICHIER DECRIT LE MODULE PRINCIPAL DE L'APPLICATION
 * ---------------------------
 * "Bizarrement", il ne fait pas référence à tous les composants qu'on utilise dans l'application
 * Au contraire, il se repose sur les autres modules. Plus précisément, il importe
 * (utilise) le module de routage (AppRoutingModule) qui fait lui même référence aux
 * autres modules utilisés (et qui contiennent eux mêmes l'ensemble des composants et autres services)
 */

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  // Les seuls composants que l'application utilise réellement c'est AppComponent (le shell, l'application globale)
  // et le NavbarComponent qui met en place la barre de navigation
  declarations: [AppComponent, NavbarComponent],
  imports: [
    BrowserModule,
    // On importe le AppRoutingModule, qui fait référence aux autres modules et met en place
    // les routes que l'application utilisera
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
