import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";

import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Router } from "@angular/router";

import { AteliersService } from "../services/ateliers.services";
import { TimerService } from "../services/timer.service";

@Component({
    selector: "accueil",
    templateUrl: "./params.component.html"
})
export class ParamsComponent implements OnInit {

    write:boolean;
    
    constructor(
        public ateliersServ:AteliersService,
        private tServ:TimerService,
        private route:Router) {
    }

    ngOnInit(): void {
        this.write = false;
    }
    /**
     * Sélection de l'atelier dans la liste
     * @param e Evénement transféré par le système
     */
    onItemTap(e:ItemEventData){
        this.ateliersServ.setAtelier(e.index);
    }
    /**
     * Clic sur le bouton de validation pour aller à la page d'accueil
     * @param args Evénement transféré par le système
     */
    onTap(args: EventData) {
        if(this.ateliersServ.atelier.title.length > 0){
            this.tServ.initTimer();
            this.route.navigate(['/home']);
        }
    }
    /**
     * Modifier les settings pour paramétrer une nouvelle adresse d'accès aux données
     */
    onTapSettings(){
        dialogs.prompt({
            title: "Paramètre réseau",
            message: "Saisissez l'adresse réseau pour accéder aux données",
            okButtonText: "Valider",
            cancelButtonText: "Annuler",
            inputType: dialogs.inputType.text
        }).then(r => {
            this.ateliersServ.setConfig(r.text);
            console.log("Dialog result: " + r.result + ", text: " + r.text);
        });
    }
    /**
     * Modifier les settings pour paramétrer une nouvelle adresse d'accès aux données
     */
    onTapDebug(){
        dialogs.confirm({
            title: "Activer le débogage",
            message: "Cliquez sur ACTIVER pour activer le débogage, ANNULER pour... annuler",
            okButtonText: "ACTIVER",
            cancelButtonText: "ANNULER"
        }).then((result) => {
            if(result){
                this.ateliersServ.debug = true;
            }else{
                this.ateliersServ.debug = false;
            }
            // result argument is boolean
            console.log("Dialog result: " + result);
        });
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
