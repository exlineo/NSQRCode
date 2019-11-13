import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SocketIO } from "nativescript-socketio";
import { TimerService } from "./timer.service";
import { AteliersService } from "./ateliers.services";

import { servAdr } from "../interfaces/globalEnv";
import { Router } from "@angular/router";
import { SessionI } from "../interfaces/appi";

@Injectable({
    providedIn: "root"
})
export class SocketService {

    constructor(
        private socketIO: SocketIO,
        private ngZone: NgZone,
        private ateliersServ:AteliersService,
        private tServ:TimerService,
        private route:Router){
    }
    /**
     * Lancer la session
     * @param t nombre d'équipe (obsolète)
     * @param s objet session
     */
    launchSession(t:string, s:any){
        this.ateliersServ.atelier.duration = s['duration']['manip'];
        this.changePhase('off'); // Renvoyer sur la page d'accueil
    }
    /**
     * Changement d'état dans la manip d'après la synchro
     * @param ph Etat de la phase
     */
    changePhase(ph:string){
        console.log("Change Phase");
        if(ph =='manip'){
            this.route.navigate(['/scan']);
            this.tServ.initTimer();
            this.tServ.launchTimer();
        }else{
            this.route.navigate(['/home']);
            this.tServ.resetTimer(); // Réinitialiser le timer
        }
    }
    /**
     * Arrêter le timer suite à un événement du socket
     * @param f Freeze ok
     * @param c Nouveau temps du timer
     */
    freezeTime(f, c){
        if(!f) {
            this.tServ.playTimer(c);
        } else {
            this.tServ.pauseTimer(c);
        }
    }
    /**
     * Connexion et gestion du socketIO
     */
    conneSock(){
        this.socketIO.connect();
            // Récupération des événements
            this.socketIO.on("hello", data => {
                console.log("Socket", data);
                this.ngZone.run(() => {
                    console.log("Re socket", data);
                });
            });
            // Lancement
            this.socketIO.on('launchSession', (t, s) => {
                this.ngZone.run(() => {
                        this.launchSession(t, s)
                    });
                });
            this.socketIO.on('changePhase', (ph) => {
                this.ngZone.run(() => {
                    this.changePhase(ph)
                    });
                });
            this.socketIO.on('freezeTime', (t, c) => {
                this.ngZone.run(() => {
                    this.freezeTime(t, c)
                    });
                });
    }
    /**
     * Déconnexion du socketIO
     */
    deconneSock(){
        this.socketIO.disconnect();
    }
}