import { Component, computed, inject, signal } from '@angular/core';
import { Spinner } from '../../../shared/spinner/spinner';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';
import { BookingService } from '../../../core/services/booking-service';
import { Booking } from '../../../core/models/booking';
import { finalize } from 'rxjs';



const CURRENT_USER_ID = 'user1';


type BookingFilter = 'upcoming' | 'past';


@Component({
  selector: 'app-my-bookings',
  imports: [Spinner, DatePipe, RouterLink, ConfirmDialog],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})


export class MyBookings {

   private readonly bookingService = inject(BookingService);

  loading = signal(true);
  bookings = signal<Booking[]>([]);
  activeFilter = signal<BookingFilter>('upcoming');
  bookingPendingCancel = signal<Booking | null>(null);
  cancelling = signal(false);

   isUpcoming(booking: Booking): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(booking.eventDate) >= today;
  }

  upcomingCount = computed(() =>
    this.bookings().filter(b => this.isUpcoming(b) && b.status !== 'cancelled').length
  );

  cancelledCount = computed(() =>
    this.bookings().filter(b => b.status === 'cancelled').length
  );

  visibleBookings = computed(() => {
    const filter = this.activeFilter();
    return this.bookings().filter(b =>
      filter === 'upcoming' ? this.isUpcoming(b) : !this.isUpcoming(b)
    );
  });

  totalTicketCount(booking: Booking): number {
    return booking.tickets.reduce((sum, t) => sum + t.quantity, 0);
  }

  ngOnInit() {
    this.bookingService.getBookings(CURRENT_USER_ID)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (bookings) => this.bookings.set(bookings),
        error: (err) => console.error('Failed to load bookings', err),
      });
  }

  setFilter(filter: BookingFilter) {
    this.activeFilter.set(filter);
  }

  requestCancel(booking: Booking) {
    this.bookingPendingCancel.set(booking);
  }

  dismissCancelDialog() {
    this.bookingPendingCancel.set(null);
  }

  confirmCancel() {
    const booking = this.bookingPendingCancel();
    if (!booking?.id) return;

    this.cancelling.set(true);
    this.bookingService.updateBookingStatus(booking.id, 'cancelled').subscribe({
      next: (updated) => {
        this.bookings.update(list =>
          list.map(b => (b.id === updated.id ? { ...b, status: 'cancelled' } : b))
        );
        this.cancelling.set(false);
        this.bookingPendingCancel.set(null);
      },
      error: () => {
        this.cancelling.set(false);
      },
    });
  }
}
