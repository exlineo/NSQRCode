import { Injectable } from "@angular/core";
import { AppI, App } from "../interfaces/app";

@Injectable({
    providedIn: "root"
})
export class AppService {
    /**
     * Variable paramètres de l'application
     */
    app:AppI;

    constructor(){
        this.app = new App();
    }
    
}