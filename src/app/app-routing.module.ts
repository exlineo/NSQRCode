import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/params", pathMatch: "full" },
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "params", loadChildren: () => import("~/app/params/params.module").then((m) => m.ParamsModule) },
    { path: "scan", loadChildren: () => import("~/app/scan/scan.module").then((m) => m.ScanModule) },
    { path: "pageinfos", loadChildren: () => import("~/app/pageinfos/pageinfos.module").then((m) => m.PageInfosModule) },
    { path: "gameover", loadChildren: () => import("~/app/gameover/gameover.module").then((m) => m.GameOverModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
