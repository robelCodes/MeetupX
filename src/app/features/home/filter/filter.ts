import { Component, input, output } from '@angular/core';

export interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.html',
  styleUrl: './filter.css',
})
export class Filter {
  categories = input.required<string[]>();
  selectedCategory = input<string>('All');
  selectedDateRange = input<string>('all');
  selectedPriceRange = input<string>('all');
  sortBy = input<string>('date');

  categorySelected = output<string>();
  dateRangeSelected = output<string>();
  priceRangeSelected = output<string>();
  sortChanged = output<string>();

  readonly dateRanges: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  readonly priceRanges: FilterOption[] = [
    { label: 'All', value: 'all' },
    { label: 'Under $50', value: 'under50' },
    { label: '$50 – $150', value: '50to150' },
    { label: '$150+', value: '150plus' },
  ];

  readonly sortOptions: FilterOption[] = [
    { label: 'Date', value: 'date' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
  ];

  onSortChange(value: string) {
    this.sortChanged.emit(value);
  }
}