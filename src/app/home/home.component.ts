import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    imageSrc: string;

    constructor() {
        this.imageSrc = 'https://picsum.photos/750';
    }
}

// https://random.imagecdn.app/500/150