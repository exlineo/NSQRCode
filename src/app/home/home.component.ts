import { Component, OnInit } from "@angular/core";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

import { Router } from "@angular/router";
import { TimerService } from "../services/timer.service";
import { AteliersService } from "../services/ateliers.services";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
        private page:Page,
        private route:Router,
        public ateliersServ:AteliersService,
        private tServ:TimerService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        console.log("Home", this.ateliersServ.atelier);
    }
    
    // Clic sur le bouton de validation
    onTap(args: EventData) {
        this.route.navigate(['/scan']);
    }
    
    ngOnDestroy() {
    }
}