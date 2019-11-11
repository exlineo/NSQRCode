import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { servAdr } from "../interfaces/globalEnv";
import { AtelierI, TemplateI } from "../interfaces/appi";

@Injectable({
    providedIn: "root"
})
export class AteliersService {
    ateliers:Array<AtelierI>;
    gabarits:Array<TemplateI>;

    atelier:AtelierI;
    gabarit:TemplateI;

    constructor(private http: HttpClient){
        // this.ateliers = ['construire', 'aider', 'developper', 'fabriquer', 'produire', 'transporter', 'accueillir', 'maintenir'];
    }
    // Avoir tous les ateliers
    getItems(): Array<AtelierI> {
        return this.ateliers;
    }
    // Avoir un objet dans la liste
    getItem(id: number): AtelierI {
        return this.ateliers[id];
    }
    // Définir l'atelier et le gabarit
    setAtelier(n:number){
        this.atelier = this.ateliers[n];
        this.gabarit = this.gabarits[n];
    }
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
                        instructions:a.instructions
                    }
                    
                    this.ateliers.push(at);
                    this.gabarits.push(a.template);
                }
                console.log(this.ateliers, this.gabarits);
            }
        );
    }
}