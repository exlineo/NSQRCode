import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ScanRoutingModule } from "./scan-routing.module";
import { ScanComponent } from "./scan.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ScanRoutingModule
    ],
    declarations: [
        ScanComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ScanModule { }
