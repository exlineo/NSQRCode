import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { SocketService } from "./services/socket.service";
import { ConfigService } from "./services/config.service";
import { TimerService } from "./services/timer.service";

import { SocketIOModule } from "nativescript-socketio/angular";
import { sock } from "./interfaces/globalEnv";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        SocketIOModule.forRoot(sock)
    ],
    declarations: [
        AppComponent
    ],
    providers:[
        BarcodeScanner,
        ConfigService,
        TimerService,
        SocketService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
