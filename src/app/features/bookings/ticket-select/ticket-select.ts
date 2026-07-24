import { Component, input, output } from '@angular/core';
import { TicketType } from '../../../core/models/event';

@Component({
  selector: 'app-ticket-select',
  imports: [],
  templateUrl: './ticket-select.html',
  styleUrl: './ticket-select.css',
})
export class TicketSelect {

  ticketTypes = input.required<TicketType[]>();
  quantities = input.required<Record<string, number>>();
  quantityChanged = output<{ ticketId: string; quantity: number }>();

  increment(ticketId: string, current: number, max: number) {
    if (current < max) {
      this.quantityChanged.emit({ ticketId, quantity: current + 1 });
    }
  }

  decrement(ticketId: string, current: number) {
    if (current > 0) {
      this.quantityChanged.emit({ ticketId, quantity: current - 1 });
    }
  }
}
