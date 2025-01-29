import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css'
})
export class NavigationComponent {
    navigationItemList: WritableSignal<NavigationItem[]> = signal([]);

    constructor() {
        this.navigationItemList.set(this.createNavigationList());
    }

    createNavigationList(): NavigationItem[] {
        let navigationList: NavigationItem[] = [
            {router: "/home", uiLabel: "Home"},
            {router: "/observe", uiLabel: "Observable Testing"},
            {router: "/boostrap", uiLabel: "Bootstrap Testing"},
            {router: "/signal", uiLabel: "Signal Testing"},
            {router: "/ng-block", uiLabel: "Angular Blocks Testing"},
            {router: "/charts", uiLabel: "Charting"}
        ];

        return navigationList;
    }
}

export interface NavigationItem {
    router: string,
    uiLabel: string
}
