import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {

  private storageKey = 'favorites';

  favoriteIds = signal<string[]>(this.getFavoritesFromStorage());

  getFavoritesFromStorage(): string[] {
    const saved = localStorage.getItem(this.storageKey);

    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  }

  isFavorite(eventId: string): boolean {
    const list = this.favoriteIds();
    return list.includes(eventId);
  }

  toggleFavorite(eventId: string) {
    const currentList = this.favoriteIds();

    if (currentList.includes(eventId)) {
      
      const newList = currentList.filter(id => id !== eventId);
      this.favoriteIds.set(newList);
    } else {
      
      const newList = [...currentList, eventId];
      this.favoriteIds.set(newList);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(this.favoriteIds()));
  }

}
