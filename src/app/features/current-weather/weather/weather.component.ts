import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
@Injectable()
export class WeatherComponent implements OnInit {

  WEATHER_API = '61a20f5d41830810abfcc3d15f5f1b2a';
  weather: CurrentWeatherResponse | undefined;

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getLocalWeather(lat: Number, lon: Number) {
    return this._httpClient.get<CurrentWeatherResponse>
    (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.WEATHER_API}&units=metric`)
    .subscribe((data: CurrentWeatherResponse) => this.weather = {
      name: data.name,
      state:  data.state,
      country:  data.country,
      lat: data.lat,
      lon: data.lon,
  });;
  }

  getRemoteWeather(query: String) {
    return this._httpClient.get<CurrentWeatherResponse>(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.WEATHER_API}&units=metric`);
  }

  getCoords () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        this.getLocalWeather(lat, lon)
      })
    }
  }

}
