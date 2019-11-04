import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { GameOverRoutingModule } from "./gameover-routing.module";
import { GameOverComponent } from "./gameover.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        GameOverRoutingModule
    ],
    declarations: [
        GameOverComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GameOverModule { }
