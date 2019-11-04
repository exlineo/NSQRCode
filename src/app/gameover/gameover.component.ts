import { Component, OnInit, OnDestroy } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

import { AppService } from "../Services/app.service";

@Component({
    selector: "gameover",
    templateUrl: "./gameover.component.html"
})
export class GameOverComponent implements OnInit {

    constructor(
        private page:Page,
        public appServ:AppService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }
    
    ngOnDestroy(): void {
       
    }
}
