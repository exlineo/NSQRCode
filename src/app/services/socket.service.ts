import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SocketService {

    constructor(){
        console.log("Service socket chargé");
    }
    
}