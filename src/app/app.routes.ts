import { Routes } from '@angular/router';
import { EventList } from './features/events/event-list/event-list';
import { NotFound } from './shared/not-found/not-found';
import { EventDetails } from './features/events/event-details/event-details';
import { BookingWizard } from './features/bookings/booking-wizard/booking-wizard';
import { MyBookings } from './features/mybookings/my-bookings/my-bookings';

export const routes: Routes = [

    {path: '', component: EventList},
    {path:'events/:id', component: EventDetails},
    {path: 'booking/:id', component: BookingWizard },
    {path: 'my-bookings', component:MyBookings},
    {path: '**', component: NotFound}
];
