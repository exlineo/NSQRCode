import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

import { AteliersService } from "../services/ateliers.services";

@Component({
    selector: "gameover",
    templateUrl: "./gameover.component.html"
})
export class GameOverComponent implements OnInit {

    constructor(
        private page:Page,
        public ateliersServ:AteliersService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }
    
    ngOnDestroy(): void {
       
    }
}
