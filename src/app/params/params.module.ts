import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { knownFolders, Folder, File } from "tns-core-modules/file-system";

import { ParamsRoutingModule } from "./params-routing.module";
import { ParamsComponent } from "./params.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ParamsRoutingModule
    ],
    declarations: [
        ParamsComponent
    ],
    providers:[
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ParamsModule { }
