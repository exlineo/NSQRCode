import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view";
import { Page } from "tns-core-modules/ui/page";
import { screen } from "tns-core-modules/platform";

import { BarcodeScanner } from 'nativescript-barcodescanner';
import { TimerService } from "../services/timer.service";
import { AteliersService } from "../services/ateliers.services";
import { servAdr } from "../interfaces/globalEnv";

@Component({
    selector: "infos",
    templateUrl: "./pageinfos.component.html"
})
export class PageInfosComponent implements OnInit {

    webViewSrc: string = "";
    enabled: boolean = false;

    tictac; // Interval
    timer:number;
    duree:string;
    adr:string;
    scanBtn:object;

    @ViewChild("maPageVue", { read: ElementRef, static: false }) webViewRef: ElementRef;

    constructor(
        private page:Page,
        private barcodeScanner: BarcodeScanner,
        public ateliersServ:AteliersService,
        public tServ:TimerService) {
            this.adr = servAdr;
    }

    ngOnInit(): void {
        console.log("Hauteur de l'écran : ", screen.mainScreen.heightPixels);
        let left = (screen.mainScreen.widthPixels/2)-175;
        let top = (screen.mainScreen.heightPixels/2)-175;
        this.scanBtn={left:left, top:top, l:350, h:350, c:175};
        this.page.actionBarHidden = true;
    }
    
    ngOnDestroy(): void {
       
    }
    public onScan() {
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            showFlipCameraButton: true,   
            preferFrontCamera: false,     
            showTorchButton: true,        
            beepOnScan: true,             
            torchOn: false,               
            resultDisplayDuration: 500,   
            orientation: "landscape",     
            openSettingsIfPermissionWasPreviouslyDenied: true // ios only 
        }).then((result) => {
            this.ateliersServ.getQRCode(result.text);
            // this.webViewSrc = result.text;
            alert({
                title: "Vous scannez",
                message: "Format: " + result.format + ",\nContent: " + result.text,
                okButtonText: "OK"
            });
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
    }
    // Evénements lancés par la WebView
    public onLoadStarted(e){
        console.log(e);
    }
    public onLoadFinished(e){
        console.log(e);
    }
}