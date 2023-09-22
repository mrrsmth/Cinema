import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2';
  constructor(private http: HttpClient) {}
  apiKey = '5d5bd00f-1ae5-456d-ad77-7f14ebe5e2ce';

  getFilm(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/films/' + id, {
      headers: {
        'X-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  getBoxOffice(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/films/' + id + '/box_office', {
      headers: {
        'X-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  getVideos(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/films/' + id + '/videos', {
      headers: {
        'X-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  getSimilars(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/films/' + id + '/similars', {
      headers: {
        'X-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  getTop(): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/films/top?type=TOP_250_BEST_FILMS&page=1',
      {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getReviews(id: number): Observable<any> {
    return this.http.get<any>(
      this.apiUrl + '/films/' + id + '/reviews' + '?page=1&order=DATE_DESC',
      {
        headers: {
          'X-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
