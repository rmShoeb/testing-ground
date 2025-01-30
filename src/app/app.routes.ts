import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ObserveComponent } from './observe/observe.component';
import { StrapbootComponent } from './strapboot/strapboot.component';
import { SignalComponent } from './signal/signal.component';
import { NgBlockComponent } from './ng-block/ng-block.component';
import { ChartComponent } from './chart/chart.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'observe', component: ObserveComponent },
    { path: 'boostrap', component: StrapbootComponent },
    { path: 'signal', component: SignalComponent },
    { path: 'ng-block', component: NgBlockComponent },
    { path: 'charts', component: ChartComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
