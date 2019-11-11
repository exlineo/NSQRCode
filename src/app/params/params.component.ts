import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { Router } from "@angular/router";

import { AteliersService } from "../services/ateliers.services";

@Component({
    selector: "accueil",
    templateUrl: "./params.component.html"
})
export class ParamsComponent implements OnInit {

    ateliers: Array<string>;
    choix:string = '';
    okBtn:string = '\uf058';
    
    constructor(private ateliersServ:AteliersService, private route:Router) {}

    ngOnInit(): void {
        this.ateliersServ.getAteliers();
        this.ateliers = ['construire', 'aider', 'developper', 'fabriquer', 'produire', 'transporter', 'accueillir', 'maintenir'];
    }

    // Sélection de l'atelier dans la liste
    onItemTap(e:ItemEventData){
        console.log(this.ateliers[e.index]);
        this.choix = this.ateliers[e.index];
        this.ateliersServ.setAtelier(e.index);
    }

    // Clic sur le bouton de validation pour aller à la page d'accueil
    onTap(args: EventData) {
        if(this.choix.length > 0){
            console.log('Validé');
            this.route.navigate(['/home']);
        }
    }
}
export function onPageLoaded(args: EventData) {
    const page = <Page>args.object;
    page.actionBarHidden = false;
}
