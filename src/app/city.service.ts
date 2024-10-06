import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './City'; // Make sure you create this model

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = 'https://localhost:7162/api/Cities'; // Your API endpoint

  constructor(private http: HttpClient) { }

  // Create a new city
  createCity(cityName: string): Observable<City> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    const newCity = { cityId: undefined, cityName }; // Do not set cityId for new entries
    return this.http.post<City>(this.apiUrl, newCity,{headers:headers});
}


  // Read all cities
  getCities(): Observable<City[]> {
      
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
   // headers = headers.append("Authorization", `Bearer dummy token`);

    return this.http.get<City[]>(this.apiUrl,{headers:headers});
  }

  // Update a city
  updateCity(city: City): Observable<City> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    return this.http.put<City>(`${this.apiUrl}/${city.cityId}`, city,{headers:headers});
  }

  // Delete a city
  deleteCity(cityId: string): Observable<void> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearer ${localStorage['token']}`);
    return this.http.delete<void>(`${this.apiUrl}/${cityId}`,{headers:headers});
  }
}
