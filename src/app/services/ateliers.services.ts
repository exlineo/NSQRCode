import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { servAdr } from "../interfaces/globalEnv";
import { AtelierI, AtelierC } from "../interfaces/appi";

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
    constructor(private http: HttpClient){
        this.getAteliers();
        this.atelier = new AtelierC();
        this.ateliers = [];
    }
    /**
     * Définir l'atelier et le gabarit
     * @param n index de l'atelier choisi
     */
    setAtelier(n:number){
        this.atelier = this.ateliers[n];
    }
    /**
     * Appel et traitement des ateliers depuis le serveur strapi
     */
    getAteliers(){
        this.http.get(servAdr + 'escapes/static/').subscribe(
            data => {
                for(let a of data['ateliers']){
                    let at = {
                        id:a.id,
                        title:a.title,
                        active:a.active,
                        team:a.team,
                        background:a.background,
                        instructions:a.instructions,
                        template:a.template
                    };
                    this.ateliers.push(at);
                }
                console.log(this.ateliers);
            }
        );
    }
    /**
     * 
     */
    getQRCode(){

    }
    /**
     * Réinitialiser les équipes dans la liste des ateliers
     */
    initTeams(){
        for(let a of this.ateliers){
            a.team = '0';
        }
    }
    /**
     * Réinitialiser les équipes dans l'atelier en cours
     */
    changeTeam(t:string){
        this.atelier.team = t;
    }
}