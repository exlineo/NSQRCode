import { Injectable, NgZone } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { SocketIO } from "nativescript-socketio";
import { TimerService } from "./timer.service";
import { AteliersService } from "./ateliers.services";

import { servAdr } from "../interfaces/globalEnv";
import { off } from "tns-core-modules/application/application";

@Injectable({
    providedIn: "root"
})
export class SocketService {

    datas:any;

    constructor(
        private socketIO: SocketIO,
        private ngZone: NgZone,
        private tServ:TimerService,
        private ateliersServ:AteliersService,
        private http:HttpClient){
            // Récupération des événements
            // Coucou
            this.socketIO.on("hello", data => {
                this.ngZone.run(() => {
                console.log(data);
                });
            });
            // Lancement
            this.socketIO.on('launchSession', (t, s) => this.launchSession(t, s));
            this.socketIO.on('changePhase', (ph) => this.changePhase(ph));
            this.socketIO.on('freezeTime', (t, c) => this.freezeTime(t, c));
            this.socketIO.on('teamInAtelier', (t, a) => this.teamInAtelier(t, a));
            this.socketIO.on('teamScores', (t, s) => this.teamScores(t, s));
    }
    /**
     * Envoyer un test au serveur
     */
    hello() {
        this.socketIO.emit("hello", { hello: "hello" });
    }

    launchSession(t:string, s:string){

    }

    changePhase(ph:string){

    }
    /**
     * Arrêter le timer suite à un événement du socket
     * @param f Freeze ok
     * @param c Nouveau temps du timer
     */
    freezeTime(f, c){
        if(!f) {
            this.tServ.timer = c;
            this.tServ.pause = false;
        } else {
            this.tServ.pause = true;
        }
    }
    /**
     * Modifier l'équipe de l'atelier actuel
     * @param t Nouvel ID d'une équipe
     * @param a L'atelier concerné (pas utile ici a priori)
     */
    teamInAtelier(t:string, a:string){
        this.ateliersServ.changeTeam(t);
    }

    teamScores(t:string, s:number){
        this.ateliersServ.changeScore(s);
    }
    /**
     * FETCHS
     */
    fetchPut(u:string, d:any){
        this.http.put(u, d).subscribe(data => {

            });
    }

    fetchLaunch(numOfTeams:number=5, manip:number, quiz:number){
        let duration = {manip, quiz};
        this.fetchPut(servAdr+'sessions/launch/', {numOfTeams, duration});
    }

    fetchPhase(p:string = 'off'){
        this.fetchPut(servAdr+'sessions/phase/'+p, {});
    }

    fetchFreeze(f:boolean=false, countdown:number=-1){
        this.fetchPut(servAdr+'sessions/freeze/'+f, {countdown});
    }

    fetchTeamAtelier(tId:string='0', aId:string){
        this.fetchPut(servAdr+'ateliers/team/'+aId, {'team':tId});
    }

    fetchScore(tId:string, aId:string, score:number=0){
        this.fetchPut(servAdr+'teams/score/'+tId, {'atelier':aId, score});
    }
}