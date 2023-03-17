import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _httpClient: HttpClient) { }

  getLocalWeather(lat: Number, lon: Number) {
    return this._httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=61a20f5d41830810abfcc3d15f5f1b2a&units=metric`);
  }

  if (navigator.geolocation) {
    const getCoords = () => {
      navigator.geolocation.getCurrentPosition( position => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          this.getLocalWeather(lat, lon)
      })
    }
  }

}
