import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Joke } from '../types/joke.type';

@Injectable()
export class ObserveService {
    constructor(private http: HttpClient) { }

    getJoke(): Observable<Joke> {
        return from(this.http.get<Joke>("https://v2.jokeapi.dev/joke/Any"));
    }
}