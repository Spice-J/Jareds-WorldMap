import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://api.worldbank.org/v2/country/?format=json';

  constructor(private http: HttpClient) {}

  getWoldbankApiData(idIso2Code: string): Observable<any> {
    const buildUrl = `${this.baseUrl}/country/${idIso2Code}/?format=json`;

    return this.http.get(buildUrl);
  }
}
