import { Component } from '@angular/core';
import { DxButtonModule, DxGalleryModule, DxSelectBoxModule } from 'devextreme-angular';
import { ValueChangedEvent } from 'devextreme/ui/select_box';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        DxButtonModule,
        DxGalleryModule,
        DxSelectBoxModule
    ],
    templateUrl: './gallery.component.html',
    styleUrl: './gallery.component.css'
})
export class GalleryComponent {
    galleryDataSource: string[] = [];
    imageAPIs: ImageApi[] = [
        { id: 0, name: "Lorem Picsum", url: "https://picsum.photos/id/%1%/750/750" },
        { id: 1, name: "Random Image API", url: "https://random.imagecdn.app/750/750" }
    ];
    selectedApiIdx: number | undefined;

    constructor() { }

    selectionchanged(event: ValueChangedEvent) {
        this.selectedApiIdx = event.value;
    }

    addImage() {
        if (this.selectedApiIdx == undefined) {
            // nothing for now
        } else {
            this.galleryDataSource.push(this.imageAPIs[this.selectedApiIdx].url.replace("%1%", this.getRandomInteger()));
        }
    }

    getRandomInteger(min: number = 1, max: number = 1000): string {
        return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
    }
}

export interface ImageApi {
    id: number;
    name: string;
    url: string;
}