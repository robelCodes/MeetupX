import { Component, input, output } from '@angular/core';
import { Booking } from '../../../core/models/booking';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  imports: [RouterLink],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})
export class BookingConfirmation {


  eventTitle = input.required<string>();
  tickets = input.required<Booking['tickets']>();
  totalAmount = input.required<number>();
  submitting = input<boolean>(false);
  submitted = input<boolean>(false);
  referenceNumber = input<string | null>(null);

  confirmBooking = output<void>();
}
