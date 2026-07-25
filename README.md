# meetUpX - Event Management Platform

This is my Angular project for an event management platform. Users can browse events, search/filter them, book tickets, and manage their bookings. Built with standalone components (no NgModules).

## Features

- Browse events in a card layout
- Search by title, filter by category/date/price, sort by date or price
- Like/favorite events (heart icon on the card)
- Click an event to see full details
- Book tickets in a 3 step form (select tickets -> attendee info -> confirm)
- My Bookings page, can cancel a booking (asks for confirmation first)
- Light/dark theme toggle, saved in localStorage

## Tech used

- Angular (standalone components)
- Signals for state
- RxJS for the http calls
- json-server for the fake backend
- Just plain CSS, no framework

## How to run it

1. `npm install`
2. Start the fake api: `json-server --watch db.json --port 3000`
3. In another terminal: `ng serve`
4. Go to `http://localhost:4200`

## Folder structure

```
src/app/
  core/           -> models and services
  features/
    bookings/     -> the booking wizard steps
    events/       -> event card, details, list
    home/         -> hero section + filters (used on the events page)
    mybookings/   -> my bookings page
  layout/         -> navbar, footer
  shared/         -> spinner, confirm dialog, not found page
```

## Notes

- The CSS/colors/layout was based on a Figma design. I took a screenshot of the Figma and used AI to help generate the starting CSS, then tweaked it myself.
- The favorites/likes are only saved in localStorage for now since there's no login system yet. Once I add a profile page I want to show the liked events there instead of just the heart icon on the card.
- There's no real auth, so bookings just use a hardcoded user id for now.
- Ticket availability doesn't actually go down after booking, the mock api doesn't handle that automatically. Will try to change that by deploying the json to supabase.