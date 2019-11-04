import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

import { Router } from "@angular/router";
import { AppI, App } from "../interfaces/app";
import { AppService } from "../services/app.service";
import { TimerService } from "../services/timer.service";

@Component({
    selector: "accueil",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    app:AppI;

    constructor(
        private page:Page,
        private route:Router,
        public appServ:AppService,
        private tServ:TimerService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.app = this.appServ.app;
    }
    
    // Clic sur le bouton de validation
    onTap(args: EventData) {
        this.route.navigate(['/scan']);
    }
}
