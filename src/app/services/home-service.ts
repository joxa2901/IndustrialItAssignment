import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AnnouncementPagination } from '../model/announcement';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://dummyjson.com/posts';
  private http = inject(HttpClient);
  announcements = signal<AnnouncementPagination | null>(null);

  getAnnouncements(limit: number = 10, skip: number = 0) {
    return this.http
      .get<AnnouncementPagination>(`${this.baseUrl}?limit=${limit}&skip=${skip}`)
      .subscribe({
        next: (a) => this.announcements.set(a),
      });
  }
}
