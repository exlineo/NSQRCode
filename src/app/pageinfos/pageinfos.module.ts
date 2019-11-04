import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { PageInfosRoutingModule } from "./pageinfos-routing.module";
import { PageInfosComponent } from "./pageinfos.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PageInfosRoutingModule
    ],
    declarations: [
        PageInfosComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PageInfosModule { }
