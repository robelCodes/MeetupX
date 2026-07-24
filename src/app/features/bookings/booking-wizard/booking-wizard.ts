import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../../../core/models/event';
import { EventsService } from '../../../core/services/events-service';
import { BookingService } from '../../../core/services/booking-service';
import { Attendee, Booking } from '../../../core/models/booking';
import { Spinner } from '../../../shared/spinner/spinner';
import { TicketSelect } from '../ticket-select/ticket-select';
import { AttendeeForm } from '../attendee-form/attendee-form';
import { BookingConfirmation } from '../booking-confirmation/booking-confirmation';



const CURRENT_USER_ID = 'user1';

@Component({
  selector: 'app-booking-wizard',
  imports: [Spinner, TicketSelect, AttendeeForm, BookingConfirmation],
  templateUrl: './booking-wizard.html',
  styleUrl: './booking-wizard.css',
})
export class BookingWizard {

  private readonly route = inject(ActivatedRoute);
  private readonly eventsService = inject(EventsService);
  private readonly bookingService = inject(BookingService);

  loading = signal(true);
  event = signal<EventModel | null>(null);

  currentStep = signal(1);
  quantities = signal<Record<string, number>>({});
  attendees = signal<Attendee[]>([]);
  showAttendeeErrors = signal(false);

  submitting = signal(false);
  submitted = signal(false);
  referenceNumber = signal<string | null>(null);

  totalTicketCount = computed(() =>
    Object.values(this.quantities()).reduce((sum, q) => sum + q, 0)
  );

  selectedTickets = computed(() => {
    const ev = this.event();
    if (!ev) return [];
    return ev.ticketTypes
      .filter(t => (this.quantities()[t.id] || 0) > 0)
      .map(t => ({
        type: t.name,
        quantity: this.quantities()[t.id],
        price: t.price,
      }));
  });

  totalAmount = computed(() =>
    this.selectedTickets().reduce((sum, t) => sum + t.price * t.quantity, 0)
  );

  step1Valid = computed(() => this.totalTicketCount() > 0);

  step2Valid = computed(() =>
    this.attendees().every(a =>
      a.name.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email) &&
      a.phone.replace(/\D/g, '').length >= 10
    )
  );

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.eventsService.getEvent(id).subscribe({
      next: (ev) => {
        this.event.set(ev);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onQuantityChange(event: { ticketId: string; quantity: number }) {
    this.quantities.update(q => ({ ...q, [event.ticketId]: event.quantity }));
  }

  onAttendeeFieldChange(event: { index: number; field: keyof Attendee; value: string }) {
    this.attendees.update(list => {
      const copy = [...list];
      copy[event.index] = { ...copy[event.index], [event.field]: event.value };
      return copy;
    });
  }

  goToStep2() {
    if (!this.step1Valid()) return;
    const count = this.totalTicketCount();
    const current = this.attendees();
    const resized: Attendee[] = Array.from({ length: count }, (_, i) =>
      current[i] ?? { name: '', email: '', phone: '' }
    );
    this.attendees.set(resized);
    this.currentStep.set(2);
  }

  goToStep3() {
    this.showAttendeeErrors.set(true);
    if (!this.step2Valid()) return;
    this.currentStep.set(3);
  }

  goBack() {
    this.currentStep.update(s => Math.max(1, s - 1));
  }

  private generateReference(): string {
    return 'BK' + Math.random().toString(36).slice(2, 8).toUpperCase();
  }

  confirmBooking() {
    const ev = this.event();
    if (!ev) return;

    this.submitting.set(true);

    const booking: Booking = {
      userId: CURRENT_USER_ID,
      eventId: ev.id,
      eventTitle: ev.title,
      eventDate: ev.date,
      tickets: this.selectedTickets(),
      attendees: this.attendees(),
      totalAmount: this.totalAmount(),
      status: 'confirmed',
      bookingDate: new Date().toISOString().slice(0, 10),
      referenceNumber: this.generateReference(),
    };

    this.bookingService.createBooking(booking).subscribe({
      next: (created) => {
        this.referenceNumber.set(created.referenceNumber);
        this.submitted.set(true);
        this.submitting.set(false);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}
