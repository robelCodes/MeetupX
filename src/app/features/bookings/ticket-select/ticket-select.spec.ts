import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSelect } from './ticket-select';

describe('TicketSelect', () => {
  let component: TicketSelect;
  let fixture: ComponentFixture<TicketSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
