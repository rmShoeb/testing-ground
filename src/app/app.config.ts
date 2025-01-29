import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        importProvidersFrom(
            LoggerModule.forRoot({
                serverLogLevel: NgxLoggerLevel.OFF,
                level: NgxLoggerLevel.TRACE,
                disableConsoleLogging: false,
            })
        ),
        provideCharts(withDefaultRegisterables()),
    ]
};
