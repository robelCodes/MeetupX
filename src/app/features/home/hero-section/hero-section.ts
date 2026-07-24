import { Component, output } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {

  search = output<string>();

  onSearch(value: string) {
    this.search.emit(value.trim());
  }
}
