import { Routes } from '@angular/router';
import { EventList } from './features/events/event-list/event-list';
import { NotFound } from './shared/not-found/not-found';
import { EventDetails } from './features/events/event-details/event-details';

export const routes: Routes = [

    {path: '', component: EventList},
    {path:'events/:id', component: EventDetails},
    {path: '**', component: NotFound}
];
