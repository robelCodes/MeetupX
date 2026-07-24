export interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export interface BookingTicket {
  type: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id?: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  tickets: BookingTicket[];
  attendees: Attendee[];
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
  referenceNumber: string;
}