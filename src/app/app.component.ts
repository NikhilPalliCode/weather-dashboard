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
  }; // Initialize with empty objects
  cityName: string = 'Timisoara';
  isLoading: boolean = true; // Add loading state

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }

  onSubmit() {
    this.isLoading = true; // Set loading to true when fetching new data
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
        this.isLoading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching weather data:', error);
        this.isLoading = false; // Set loading to false even if there's an error
      }
    );
  }
}
