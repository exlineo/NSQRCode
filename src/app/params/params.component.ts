import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

import { AteliersService } from "../services/ateliers.services";
import { AtelierI, AtelierC } from "../interfaces/appi";

@Component({
    selector: "accueil",
    templateUrl: "./params.component.html"
})
export class ParamsComponent implements OnInit {
    
    constructor(public ateliersServ:AteliersService, private route:Router) {}

    ngOnInit(): void {
        // console.log(this.ateliersServ.atelier.template.pageBackground);
    }
    /**
     * Sélection de l'atelier dans la liste
     * @param e Evénement transféré par le système
     */
    onItemTap(e:ItemEventData){
        console.log(this.ateliersServ.ateliers[e.index]);
        this.ateliersServ.setAtelier(e.index);
    }
    /**
     * Clic sur le bouton de validation pour aller à la page d'accueil
     * @param args Evénement transféré par le système
     */
    onTap(args: EventData) {
        if(this.ateliersServ.atelier.title.length > 0){
            this.route.navigate(['/home']);
        }
    }
}
/**
 * Enlever la barre d'action
 * @param args Evénement transféré par le système
 */
export function onPageLoaded(args: EventData) {
    const page = <Page>args.object;
    page.actionBarHidden = false;
}
