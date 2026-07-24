import { inject, Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/bookings';

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}?userId=${userId}`);
  }

  updateBookingStatus(id: string, status: Booking['status']): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}`, { status });
  }

}
