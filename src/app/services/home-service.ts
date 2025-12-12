import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AnnouncementPagination } from '../model/announcement';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = 'https://dummyjson.com/posts';
  private http = inject(HttpClient);
  announcements = signal<AnnouncementPagination | null>(null);

  getAnnouncements() {
    return this.http.get<AnnouncementPagination>(`${this.baseUrl}`);
  }

  // getAnnouncements(limit: number = 10, skip: number = 0, search?: string) {
  //   let params = new HttpParams().set('limit', limit).set('skip', skip);

  //   if (search) {
  //     params = params.set('q', search);
  //   }

  //   return this.http.get<AnnouncementPagination>(`${this.baseUrl}/search`, { params }).subscribe({
  //     next: (res) => this.announcements.set(res),
  //   });
  // }
}
