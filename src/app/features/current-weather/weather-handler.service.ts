import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { CurrentWeatherResponse } from 'src/app/features/current-weather/weather-response';
// import { WeatherComponent } from './weather/weather.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherHandlerService {

  WEATHER_API = '61a20f5d41830810abfcc3d15f5f1b2a';
  current: CurrentWeatherResponse | undefined;
  iconUrl: String | undefined;
  description: String | undefined;

  constructor(private _httpClient: HttpClient) { }

  getWeatherByCoords(lat: Number, lon: Number) {
    return this._httpClient.get<CurrentWeatherResponse>
    (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.WEATHER_API}&units=metric`);
  }

  getWeatherByQuery(query: String) {
    return this._httpClient.get<CurrentWeatherResponse>
    (`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${this.WEATHER_API}&units=metric`);
  }

  populateData(response: CurrentWeatherResponse) {
    this.current = response;
    console.log('populated with this:', this.current);
    this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
    this.description = this.current?.weather[0]?.description;
  }

}
