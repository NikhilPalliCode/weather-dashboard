import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  weatherData: any = {
    current: {},
    location: {},
  };
  cityName: string = 'Timisoara';
  isLoading: boolean = true;
  isCelsius: boolean = true; // Track temperature unit (Celsius by default)
  isKmh: boolean = true; // Track wind speed unit (km/h by default)

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit() {
    this.isLoading = true;
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  private getWeatherData(cityName: string) {
    this.weatherService.getWeatherData(cityName).subscribe(
      (data) => {
        if (data && data.current) {
          this.weatherData = data;
          console.log(this.weatherData);
        } else {
          console.error('Invalid data received from the API');
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false;
      }
    );
  }
}