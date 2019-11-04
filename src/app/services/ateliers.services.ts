import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AteliersService {
    liste:Array<string>;

    constructor(){
        this.liste = ['construire', 'aider', 'developper', 'fabriquer', 'produire', 'transporter', 'accueillir', 'maintenir'];
    }
    getItems(): Array<string> {
        return this.liste;
    }
    getItem(id: number): string {
        return this.liste[id];
        // return this.liste.filter((string) => item.id === id)[0];
    }
}