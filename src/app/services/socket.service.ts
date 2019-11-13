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
    }
    /**
     * Envoyer un test au serveur
     */
    hello() {
        this.socketIO.emit("hello", { hello: "hello" });
    }

    launchSession(t:string, s:string){

    }

    changePhase(){

    }

    freezeTime(){

    }

    teamInAtelier(){

    }
    teamScore(){

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