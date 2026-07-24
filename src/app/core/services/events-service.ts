import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventModel } from '../models/event';


@Injectable({
  providedIn: 'root',
})
export class EventsService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/events';

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.apiUrl);
  }

  getEvent(id: string): Observable<EventModel> {
    return this.http.get<EventModel>(`${this.apiUrl}/${id}`);
  }

}
