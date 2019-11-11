import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppI, AppC } from "../interfaces/appi";

@Injectable({
    providedIn: "root"
})
export class ConfigService {
    /**
     * Variable paramètres de l'application
     */
    appc:AppI;

    constructor(private http: HttpClient){
        this.appc = new AppC();
    }
    getConfig(){
        // this.http.get(this.serverUrl, { headers: headers });
    }
}