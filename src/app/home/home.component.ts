import { Component, OnInit } from "@angular/core";
import { ItemEventData } from "tns-core-modules/ui/list-view";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

import { Router } from "@angular/router";
import { AppI } from "../interfaces/appi";
import { TimerService } from "../services/timer.service";
import { AteliersService } from "../services/ateliers.services";
import { servAdr } from '../interfaces/globalEnv';

import { SocketIO } from "nativescript-socketio";
import { SocketService } from "../services/socket.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
        private page:Page,
        private route:Router,
        public ateliersServ:AteliersService,
        private tServ:TimerService,
        private socketIO:SocketIO,
        private socket:SocketService) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.socket.conneSock();
    }
    
    // Clic sur le bouton de validation
    onTap(args: EventData) {
        this.route.navigate(['/scan']);
    }
    
    ngOnDestroy() {
        this.socket.deconneSock();
    }
}