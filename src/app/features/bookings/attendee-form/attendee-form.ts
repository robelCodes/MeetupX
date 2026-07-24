import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Attendee } from '../../../core/models/booking';

@Component({
  selector: 'app-attendee-form',
  imports: [FormsModule],
  templateUrl: './attendee-form.html',
  styleUrl: './attendee-form.css',
})
export class AttendeeForm {

  attendees = input.required<Attendee[]>();
  showErrors = input<boolean>(false);
  attendeeChanged = output<{ index: number; field: keyof Attendee; value: string }>();

  onFieldChange(index: number, field: keyof Attendee, value: string) {
    this.attendeeChanged.emit({ index, field, value });
  }

  isNameInvalid(attendee: Attendee): boolean {
    return attendee.name.trim().length === 0;
  }

  isEmailInvalid(attendee: Attendee): boolean {
    return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email);
  }

  isPhoneInvalid(attendee: Attendee): boolean {
    return attendee.phone.replace(/\D/g, '').length < 10;
  }
}
