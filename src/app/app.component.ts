import { Component, OnInit } from "@angular/core";
import { UiService } from "./ui/ui.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  // Permet de savoir si on doit afficher ou non une barre de chargement
  isLoading = false;

  /**
   * @param ui Le service qui gère l'User Interface (des services d'affichage en gros)
   */
  constructor(private ui: UiService) {}

  ngOnInit() {
    // On se branche au sujet LoadingState du service UI pour savoir si on doit afficher une barre de chargement
    // ou pas. Chaque fois que le loadingState émet un événement, on y réagit en fonction de ce qu'il dit
    this.ui.loadingState.subscribe(state => {
      this.isLoading = state;
    });
  }
}
