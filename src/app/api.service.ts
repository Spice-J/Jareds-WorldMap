import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//API service to access worldbank API and build appropriate url based on the clicked country's path id value. Handles errors.
export class ApiService {
  private baseUrl = 'https://api.worldbank.org/v2';

  constructor(private http: HttpClient) {}

  constructApiUrl(clickedCountryId: string): string {
    return `${this.baseUrl}/country/${clickedCountryId}?format=json`;
  }

  getWorldBankApiData(clickedCountryId: string): Observable<any> {
    const url = this.constructApiUrl(clickedCountryId);

    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error in API request:', error);
        return throwError(() => error);
      })
    )
  }
}
