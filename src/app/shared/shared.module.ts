/**
 * CE FICHIER DECRIT LE MODULE "PARTAGE"
 * ----------------
 * Le but d'un module "partagé" (Shared Module) est de mettre en place des choses dont plusieurs autres modules
 * auront besoin.
 *
 * Exemple : Le CustomersModule, comme le AuthModule, utilisent tous deux :
 * - CommonModule
 * - HttpClientModule
 * - RouterModule
 * - ReactiveFormsModule
 *
 * On met donc en place ces modules communs ici, et dans les deux autres modules, on en profitera
 */

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  /**
   * Rappel sur les exports :
   * Toute classe exportée par un module sera utilisable dans un module qui importe ce module
   * Donc si on importe le SharedModule, on peut profiter du CommonModule, du HttpClientModule, du RouterModule et du ReactiveFormsModule
   */
  exports: [CommonModule, HttpClientModule, RouterModule, ReactiveFormsModule]
})
export class SharedModule {}
