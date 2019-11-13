import { Injectable } from "@angular/core";
import { setInterval, clearInterval } from "tns-core-modules/timer";
import { Router } from "@angular/router";
import { AteliersService } from "./ateliers.services";

@Injectable({
    providedIn: "root"
})
export class TimerService {

    timer: number; // Durée totale du timer
    duree: string; // Durée à afficher dans la vue
    pause: boolean; // L'interval est-il en pause ?
    tick: number; // Rythme de mise à jour de l'interval
    tictac:any; // L'interval qui se joue
    phase:string; // Savoir ou nous en sommes

    constructor(
        private ateliersServ:AteliersService,
        private route:Router) {
            
    }
    initTimer(){
        this.setDuree();
        this.setTick();
        if(this.timer && this.timer > 0){
            this.setTimer();
        }
    }
    /**
     * Lancer l'interval du chrono
     */
    launchTimer(){
        if(this.tictac){
            this.detruitTimer();
        }
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
    setDuree(d:number = -1) {
        if(d > -1){
            this.timer = d;
        }else{
            this.timer = this.ateliersServ.atelier.duration;
        }
    }
    /**
     * Paramétrer le tick qui va déterminer le rythme de déroulé de l'interval
     */
    setTick(t: number = 1000) {
        this.tick = t;
    }
    /**
     * Mettre le timer en pause
     */
    pauseTimer(t:number = -1) {
        if(t > -1){
            this.timer = t;
        }
        this.pause = true;
    }
    /** 
     * Jouer le timer
     */
    playTimer(t:number = -1) {
        if(t > -1){
            this.timer = t;
        }
        this.pause = false;
    }
    /**
     * Détruire le timer
     */
    detruitTimer() {
        clearInterval(this.tictac);
        this.tictac = null;
    }
    /**
     * Relancer le timer
     */
    resetTimer(){
        this.detruitTimer();
        this.timer = this.ateliersServ.atelier.duration;
        this.pause = true; // Timer en pause
        this.setTimer(); // Mettre à jour durée
    }
    /**
     * Renvoyer une valeur pour l'affichage
     */
    setTimer() {
        console.log("Set timer", this.timer, this.duree);
        if(this.timer >= 0){
            let mod = Math.floor(this.timer / 60);
            let reste = this.timer - (mod * 60);

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
            this.timer -= 1;
        }
    }
    
}