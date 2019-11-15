import { Injectable, NgZone } from "@angular/core";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { HttpClient } from "@angular/common/http";

import { AtelierI, AtelierC, DurationI, DurationC, ManipI } from "../interfaces/appi";
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
    debug:boolean;

    docs: Folder;
    dos: Folder;
    file: File;

    url:string;
    /**
     * Service central pour la gestion des données statiques de l'application
     * @param http Appels de données AJAX
     */
    constructor(
        private http: HttpClient,
        private route: Router,
        private ngZone: NgZone) {
        // Initialiser les données initiales
        this.atelier = new AtelierC();
        this.ateliers = [];
        this.duration = new DurationC();
        // Préparation de la lecture du fichier de configuration locale
        this.docs = <Folder>knownFolders.currentApp();
        this.dos = <Folder>this.docs.getFolder("QRConfig");
        this.file = <File>this.dos.getFile("config.txt");

        this.litConfig();

        this.debug = false;
    }
    /**
     * Réécrire l'adresse du serveur en local
     * @param u Adresse du serveur
     */
    setConfig(u:string="http://neoakitania.ddns.net/") {
        console.log("fichier", this.file);
        this.file.writeText(u)
            .then((result) => {
                this.litConfig();
        }).catch((err) => {
            console.log(err.stack);
        });
    }
    /**
     * Récupérer les données du fichier local
     */
    litConfig(){
        this.file.readText()
            .then((res) => {
                console.log("Fichier local", res, res.length);
                if(res.length > 0){
                    this.url = res;
                    this.getAteliers();
                }else{
                    this.setConfig();
                }
            })
            .catch((err) => {
                console.log(err.stack);
                this.setConfig();
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
        this.http.get(this.url + 'escapes/static/').subscribe(
            data => {
                this.ngZone.run(() => {
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
                });
                // this.atelier = this.ateliers[0];
            },
        );
    }
    /**
     * Récupérer les données scannées du QRCode
     * @param u Adresse scannée par un QRCode
     */
    getQRCode(u: string) {
        this.http.get(u).subscribe(data => {
            console.log(data);
            this.qrcodeJson = data;
            console.log(this.qrcodeJson);
            this.route.navigate(['/pageinfos']);
        })
    }
    /**
     * 
     * @param t Titre du déboggage
     * @param m 
     */
    debugInfos(t:string, m:string){
        if(this.debug){
            alert({
                title: t,
                message: m,
                okButtonText: "OK"
            });
        }
    }
}