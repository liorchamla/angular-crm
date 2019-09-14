/**
 * CE FICHIER CONTIENT LE SERVICE "UI"
 * ----------------------
 * Le but est de centraliser des méthodes en rapport avec l'interface et qui seront
 * utilisées un peu partout.
 *
 * On possède aussi un Subject (sujet) qui sera observé par les composants qui le souhaitent
 * pour savoir si l'on doit afficher un indicateur de chargement à l'utilisateur ou pas
 */

import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {
  Router,
  ResolveStart,
  ResolveEnd,
  NavigationCancel
} from "@angular/router";

@Injectable({
  // Utilisable dans toute l'application
  providedIn: "root"
})
export class UiService {
  /**
   * Le fameux sujet qui sera observé et permettra de savoir si l'on est "en chargement"
   * ou pas
   */
  loadingState = new Subject<boolean>();

  /**
   * @param router Injection du router afin d'écouter ses événéments
   */
  constructor(private router: Router) {
    // On met en place les événements du Router qui nous intéressent
    this.initializeRouterEvents();
  }

  /**
   * Permet d' "activer" le sujet avec la valeur "true" et de prévenir tous ceux qui l'observent
   * Grosso modo : on fait comprendre à ceux qui observent que l'application est "en chargement"
   */
  public activateLoading() {
    this.loadingState.next(true);
  }

  /**
   * Permet d' "activer" le sujet avec la valeur "false" et de prévenir tous ceux qui l'observent
   * Grosso modo : on fait comprendre à ceux qui observent que l'application n'est pas "en chargement"
   */
  public deactivateLoading() {
    this.loadingState.next(false);
  }

  /**
   * Permet de connaitre la traduction pour le statut d'une facture (PAID, SENT ou CANCELLED)
   * @param status Le status de la facture
   */
  public getInvoiceStatusLabel(status: string) {
    const labels = {
      PAID: "Payée",
      SENT: "Envoyée",
      CANCELLED: "Annulée"
    };

    return labels[status];
  }

  /**
   * Permet de connaître la couleur bootstrap voulue pour un statut de facture
   * PAID = vert (success)
   * SENT = bleu (primary)
   * CANCELLED = orange (warning)
   * @param status Le status de la facture
   */
  public getInvoiceStatusBadge(status: string) {
    const classes = {
      PAID: "success",
      SENT: "primary",
      CANCELLED: "warning"
    };

    return classes[status];
  }

  /**
   * On observe certains événements du Router pour savoir si l'on est "en chargement" ou pas
   */
  private initializeRouterEvents() {
    this.router.events.subscribe(event => {
      // Quand l'événement dit qu'on commence une "résolution", on dit qu'on est "en chargement"
      if (event instanceof ResolveStart) {
        this.loadingState.next(true);
      }
      // Quand l'événement dit qu'une résolution a été terminée ou que la navigation a été annulée,
      // on dit qu'on n'est plus "en chargement"
      else if (
        event instanceof ResolveEnd ||
        event instanceof NavigationCancel
      ) {
        this.loadingState.next(false);
      }
    });
  }
}
