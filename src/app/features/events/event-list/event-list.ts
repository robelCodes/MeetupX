import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { EventsService } from '../../../core/services/events-service';
import { EventModel } from '../../../core/models/event';
import { EventCard } from '../event-card/event-card';
import { finalize } from 'rxjs';
import { Spinner } from '../../../shared/spinner/spinner';
import { HeroSection } from '../../home/hero-section/hero-section';
import { Filter } from '../../home/filter/filter';

@Component({
  selector: 'app-event-list',
  imports: [EventCard, Spinner, HeroSection, Filter],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList implements OnInit {
  private readonly eventsService = inject(EventsService);

  loading = signal(true);

  events = signal<EventModel[]>([]);
  searchTerm = signal('');
  selectedCategory = signal ('All');

  selectedDateRange = signal('all');
selectedPriceRange = signal('all');
sortBy = signal('date');

  categories = computed(()=>[
    'All',
    ...new Set(this.events().map(e=>e.category)),
  ])

  



   private getLowestPrice(event: EventModel): number {
    return Math.min(...event.ticketTypes.map(t => t.price));
  }

  private matchesDateRange(eventDate: string, range: string): boolean {
    if (range === 'all') return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);

    const daysDiff = (eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    if (range === 'today') return daysDiff === 0;
    if (range === 'week') return daysDiff >= 0 && daysDiff <= 7;
    if (range === 'month') return daysDiff >= 0 && daysDiff <= 30;
    return true;
  }

  private matchesPriceRange(event: EventModel, range: string): boolean {
    const price = this.getLowestPrice(event);
    if (range === 'all') return true;
    if (range === 'under50') return price < 50;
    if (range === '50to150') return price >= 50 && price <= 150;
    if (range === '150plus') return price > 150;
    return true;
  }

  visibleEvents = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const dateRange = this.selectedDateRange();
    const priceRange = this.selectedPriceRange();
    const sort = this.sortBy();

    const filtered = this.events().filter(event => {
      const matchesCategory = category === 'All' || event.category === category;
      const matchesSearch = event.title.toLowerCase().includes(term);
      const matchesDate = this.matchesDateRange(event.date, dateRange);
      const matchesPrice = this.matchesPriceRange(event, priceRange);
      return matchesCategory && matchesSearch && matchesDate && matchesPrice;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'price-asc') return this.getLowestPrice(a) - this.getLowestPrice(b);
      if (sort === 'price-desc') return this.getLowestPrice(b) - this.getLowestPrice(a);
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  });

  ngOnInit() {
    this.eventsService.getEvents().pipe(
      finalize(() => this.loading.set(false))
    ).subscribe({
      next: (events) => this.events.set(events),
      error: (err) => console.error('Failed to load events', err),
    });
  }

  onSearch(term: string) { this.searchTerm.set(term); }
  onCategorySelect(category: string) { this.selectedCategory.set(category); }
  onDateRangeSelect(range: string) { this.selectedDateRange.set(range); }
  onPriceRangeSelect(range: string) { this.selectedPriceRange.set(range); }
  onSortChange(sort: string) { this.sortBy.set(sort); }
}
