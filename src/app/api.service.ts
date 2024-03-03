import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  constructApiUrl(clickedCountryId: string): Observable<any> {
    const apiUrl = `https://api.worldbank.org/v2/country/${clickedCountryId}?format=json`;
    return this.http.get(apiUrl);
  }
}
