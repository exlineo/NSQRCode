import { Injectable } from "@angular/core";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { HttpClient } from "@angular/common/http";

import { servAdr } from "../interfaces/globalEnv";
import { AtelierI, AtelierC, DurationI, DurationC, ManipI } from "../interfaces/appi";
import { TimerService } from "./timer.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class AteliersService {
    /**
     * Liste des ateliers typés reçue depuis le serveur
     */
    ateliers: Array<AtelierI>;
    /**
     * L'atelier qui a été choisi sur la page 'paramètres' dans la liste des ateliers
     */
    atelier: AtelierI;
    duration: DurationI;
    /**
     * JSON Récupéré après un scan
     */
    qrcodeJson: any;
    /**
     * Messages d'informations diffusés au fil de l'eau
     */
    infos: string;

    docs: Folder;
    dos: Folder;
    file: File;
    /**
     * Service central pour la gestion des données statiques de l'application
     * @param http Appels de données AJAX
     */
    constructor(
        private http: HttpClient,
        private route: Router) {
        this.getAteliers();
        this.atelier = new AtelierC();
        this.ateliers = [];
        this.duration = new DurationC();
        this.litConfig();
    }
    litConfig() {
        this.docs = <Folder>knownFolders.documents();
        this.dos = <Folder>this.docs.getFolder("QRConfig");
        this.file = <File>this.dos.getFile("config.json");

        this.file.readText()
            .then((res) => {
                console.log("Lecture config", res);
            }).catch((err) => {
                console.log(err.stack);
            });
    }
    /**
     * Définir l'atelier et le gabarit
     * @param n index de l'atelier choisi
     */
    setAtelier(n: number) {
        this.atelier = this.ateliers[n];
        console.log(this.atelier);
    }
    /**
     * Appel et traitement des ateliers depuis le serveur strapi
     */
    getAteliers() {
        this.http.get(servAdr + 'escapes/static/').subscribe(
            data => {
                console.log(data['session']['duration']['manip']);
                let manip_tmp: ManipI = { 'content': data['escape']['manip']['content'], 'gameover': data['escape']['manip']['gameover'] }
                for (let a of data['ateliers']) {
                    let at = {
                        id: a.id,
                        title: a.title,
                        active: a.active,
                        duration: parseInt(data['session']['duration']['manip']),
                        background: a.background,
                        instructions: a.instructions,
                        manip: manip_tmp,
                        template: a.template
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
    getQRCode(u: string) {
        this.http.get(u).subscribe(data => {
            console.log(data);
            this.qrcodeJson = data;
            console.log(this.qrcodeJson);
            this.route.navigate(['/pageinfos']);
        })
    }
}