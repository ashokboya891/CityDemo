import { Component } from '@angular/core';
import { City } from '../City';
import { CityService } from '../city.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent {
  cities: City[] = [];
  newCityName: string = '';
  editedCityId: string | null = null;
  
  constructor(private cityService: CityService, private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities() {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  addCity() {
    if(this.newCityName==='')
    {
      alert("City Name is required");
      return;
    }
    this.cityService.createCity(this.newCityName).subscribe(() => {
        this.loadCities();
        this.newCityName = ''; // Clear the input
    }, error => {
        console.error('Error creating city:', error);
    });
  }

  editCity(city: City) {
    this.editedCityId = city.cityId;
    this.newCityName = city.cityName; // Pre-fill input for editing
  }

  updateCity() {
    if (this.editedCityId) {
      const updatedCity: City = { cityId: this.editedCityId, cityName: this.newCityName };
      this.cityService.updateCity(updatedCity).subscribe(() => {
        this.loadCities();
        this.newCityName = '';
        this.editedCityId = null; // Reset to add mode
      });
    }
  }

  cancelEdit() {
    this.editedCityId = null;
    this.newCityName = ''; // Reset input field
  }

  deleteCity(cityId: string) {
    this.cityService.deleteCity(cityId).subscribe(() => {
      this.loadCities();
    });
  }

  refreshClicked(): void {
    this.accountService.postGenerateNewToken().subscribe({
      next: (response: any) => {
        localStorage["token"] = response.token;
        localStorage["refreshToken"] = response.refreshToken;
        this.loadCities();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}
