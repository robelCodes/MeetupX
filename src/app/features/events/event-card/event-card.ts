import { DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { EventModel } from '../../../core/models/event';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {

   event = input.required<EventModel>();

   
  lowestPrice = computed(() => {
  return Math.min(
    ...this.event().ticketTypes.map(ticket => ticket.price)
  );
});

totalAvailable = computed(()=>{
  return this.event().ticketTypes.reduce((total, ticket)=> total+ ticket.available,0)
})


}
