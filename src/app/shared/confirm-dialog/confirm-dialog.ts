import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {

  title = input<string>('Are you sure?');
  message = input<string>('This action cannot be undone.');
  confirmLabel = input<string>('Confirm');

  confirmed = output<void>();
  cancelled = output<void>();
}
