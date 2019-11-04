import { Component } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
    constructor(private page: Page){
        // this.page.actionBarHidden = true;
    }
}
