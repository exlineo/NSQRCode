import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { servAdr } from "../interfaces/globalEnv";
import { AtelierI, AtelierC, DurationI, DurationC, ManipI } from "../interfaces/appi";
import { TimerService } from "./timer.service";

@Injectable({
    providedIn: "root"
})
export class AteliersService {
    /**
     * Liste des ateliers typés reçue depuis le serveur
     */
    ateliers:Array<AtelierI>;
    /**
     * L'atelier qui a été choisi sur la page 'paramètres' dans la liste des ateliers
     */
    atelier:AtelierI;
    duration:DurationI;
    /**
     * JSON Récupéré après un scan
     */
    qrcodeJson:object;
    /**
     * Messages d'informations diffusés au fil de l'eau
     */
    infos:string;
    /**
     * Service central pour la gestion des données statiques de l'application
     * @param http Appels de données AJAX
     */
    constructor(
        private http: HttpClient){
            this.getAteliers();
            this.atelier = new AtelierC();
            this.ateliers = [];
            this.duration = new DurationC();
    }
    /**
     * Définir l'atelier et le gabarit
     * @param n index de l'atelier choisi
     */
    setAtelier(n:number){
        this.atelier = this.ateliers[n];
        console.log(this.atelier);
    }
    /**
     * Appel et traitement des ateliers depuis le serveur strapi
     */
    getAteliers(){
        this.http.get(servAdr + 'escapes/static/').subscribe(
            data => {
                console.log(data['session']['duration']['manip']);
                let manip_tmp:ManipI = {'content':data['escape']['manip']['content'], 'gameover':data['escape']['manip']['gameover']}
                for(let a of data['ateliers']){
                    let at = {
                        id:a.id,
                        title:a.title,
                        active:a.active,
                        duration:parseInt(data['session']['duration']['manip']),
                        background:a.background,
                        instructions:a.instructions,
                        manip:manip_tmp,
                        template:a.template
                    };
                    this.ateliers.push(at);
                }
                // this.atelier = this.ateliers[0];
            },
        );
    }
    /**
     * 
     */
    getQRCode(){

    }
}