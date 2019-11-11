import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

import { Router } from "@angular/router";
import { AppI } from "../interfaces/appi";
import { ConfigService } from "../services/config.service";
import { TimerService } from "../services/timer.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    appc:AppI;

    constructor(
        private page:Page,
        private route:Router,
        public confServ:ConfigService,
        private tServ:TimerService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.appc = this.confServ.appc;
    }
    
    // Clic sur le bouton de validation
    onTap(args: EventData) {
        this.route.navigate(['/scan']);
    }
    
}
