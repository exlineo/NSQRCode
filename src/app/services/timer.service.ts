import { Injectable } from "@angular/core";
import { AppI, AppC } from "../interfaces/appi";
import { ConfigService } from "./config.service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})
export class TimerService {
    appc:AppI

    timer: number; // Durée totale du timer
    duree: string; // Durée à afficher dans la vue
    pause: boolean; // L'interval est-il en pause ?
    tick: number; // Rythme de mise à jour de l'interval
    tictac; // L'interval qui se joue

    constructor(
        private appServ:ConfigService,
        private route:Router
        ) {
        this.appc = this.appServ.appc;
        this.initTimer(this.appc.duration, 1000);
    }
    /**
     * Initialiser le timer
     */
    initTimer(d: number = 0, t: number = 1000) {
        this.setDuree(d);
        this.setTick(t);
        this.pause = false;
        this.tictac = setInterval(() => {
            if (!this.pause) {
                this.setTimer();
            }
        }, this.tick);
    }
    /**
     * Indiquer la durée du timer. Il s'arrête à la fin
     */
    setDuree(d: number) {
        this.timer = d;
    }
    /**
     * Paramétrer le tick qui va déterminer le rythme de déroulé de l'interval
     */
    setTick(t: number) {
        this.tick = t;
    }
    /**
     * Mettre le timer en pause
     */
    pauseTimer() {
        this.pause = true;
    }
    /** 
     * Jouer le timer
     */
    playTimer() {
        this.pause = false;
    }
    /**
     * Détruire le timer
     */
    detruitTimer() {
        clearInterval(this.tictac);
    }
    /**
     * Renvoyer une valeur pour l'affichage
     */
    setTimer() {
        if(this.timer > 0){
            this.timer -= 1;
            let mod = Math.floor(this.timer / 60);
            let reste = this.timer - (mod * 60);

            // console.log("mod : "+mod, "reste : "+reste);

            if (this.timer > 59) {
                if (reste > 0) {
                    this.duree = String(mod + ' min ' + reste + ' sec');
                } else {
                    this.duree = String(mod + ' min ');
                }
            } else {
                this.duree = String(reste + ' sec');
            }
            // A la fin du timer, renvoie vers la fin du jeu
            if(this.timer <= 0){
                this.route.navigate(['/gameover']);
            }
        }
    }
}