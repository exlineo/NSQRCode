import { Component, OnInit, OnDestroy} from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

import { BarcodeScanner } from 'nativescript-barcodescanner';
import { TimerService } from "../services/timer.service";
import { Router } from "@angular/router";
import { AteliersService } from "../services/ateliers.services";

@Component({
    selector: "scan",
    templateUrl: "./scan.component.html"
})
export class ScanComponent implements OnInit {

    enabled: boolean = false;

    tictac; // Interval
    timer:number;
    duree:string;

    scanBtn:object;

    constructor(
        private page:Page,
        private route:Router,
        private barcodeScanner: BarcodeScanner,
        public ateliersServ:AteliersService,
        public tServ:TimerService) {
    }

    ngOnInit(): void {
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
            openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
        }).then((result) => {
            console.log(result.text, result.format);
            this.ateliersServ.getQRCode(result.text);
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
}
