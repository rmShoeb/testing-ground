import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        NavigationComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    constructor(private logger: NGXLogger) {}

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        this.logger.info(`Key Pressed: ${event.key}`);
    }
}
