import { DatePipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { EventModel } from '../../../core/models/event';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../core/services/favorites-service';

@Component({
  selector: 'app-event-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {

   event = input.required<EventModel>();
   favoritesService = inject(FavoritesService);

   
  lowestPrice = computed(() => {
  return Math.min(
    ...this.event().ticketTypes.map(ticket => ticket.price)
  );
});

totalAvailable = computed(()=>{
  return this.event().ticketTypes.reduce((total, ticket)=> total+ ticket.available,0)
})




  isFavorited = computed(() => {
    return this.favoritesService.isFavorite(this.event().id);
  });

  onFavoriteClick(domEvent: Event) {
    
    domEvent.preventDefault();
    domEvent.stopPropagation();

    this.favoritesService.toggleFavorite(this.event().id);
  }


}
