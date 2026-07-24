import { Component, inject, signal } from '@angular/core';
import { Spinner } from '../../../shared/spinner/spinner';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../../core/services/events-service';
import { switchMap } from 'rxjs';
import { EventModel } from '../../../core/models/event';

@Component({
  selector: 'app-event-details',
  imports: [Spinner, DatePipe, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {

  private readonly route = inject(ActivatedRoute);
  private readonly eventsService = inject(EventsService);

  loading = signal(true);
  notFound = signal(false);
  event = signal<EventModel | null>(null);

  constructor() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          this.loading.set(true);
          this.notFound.set(false);
          return this.eventsService.getEvent(params.get('id')!);
        })
      )
      .subscribe({
        next: (event) => {
          this.event.set(event);
          this.loading.set(false);
        },
        error: () => {
          this.notFound.set(true);
          this.loading.set(false);
        },
      });
  }

  getLowestPrice(): number {
    const ev = this.event();
    if (!ev) return 0;
    return Math.min(...ev.ticketTypes.map(t => t.price));
  }
  
}
