import { Component, NgZone } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

import { Fontawesome } from 'nativescript-fontawesome';
Fontawesome.init();

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    constructor(
        private page: Page){
        console.log("coucou app");
    }
}
