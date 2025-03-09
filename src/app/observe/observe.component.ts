import { Component } from '@angular/core';
import { interval, Observable, Subject, take } from 'rxjs';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { NGXLogger } from 'ngx-logger';
import { ObserveService } from './observe.service';
import { Joke } from '../types/joke.type';

@Component({
    selector: 'app-observe',
    standalone: true,
    imports: [
        DxButtonModule
    ],
    providers: [ObserveService],
    templateUrl: './observe.component.html',
    styleUrl: './observe.component.css'
})
export class ObserveComponent {
    obs: Observable<Joke>;
    subject = new Subject<number>();

    constructor(private observeService: ObserveService, private logger: NGXLogger) {
        this.obs = this.observeService.getJoke();
        this.createObservers();
    }

    fetchData() {
        this.logger.log('Fetching data');
        this.obs.subscribe({
            next: (response) => {
                this.logger.info('Received Data: ', response);
            },
            complete: () => this.logger.info('Completed fetching data'),
            error: (err) => this.logger.error('Error fetching data:', err),
        });
        this.logger.log('Data fetching completed');
    }

    createObservers() {
        this.subject.subscribe({
            next: (v) => this.logger.info(`observerA: ${v}`),
        });
        this.subject.subscribe({
            next: (v) => this.logger.info(`observerB: ${v}`),
        });
    }

    sendDataToObservers() {
        this.subject.next(Math.ceil(Math.random() * 100));
        interval(1000).pipe(take(3)).subscribe(this.subject);
    }
}
   