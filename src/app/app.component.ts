import { Component, OnInit, Injectable } from '@angular/core';
import { WeatherHandlerService } from 'src/app/service/weather-handler.service';
import { CurrentWeatherResponse } from 'src/app/features/current/weather-response';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <app-search></app-search>
      <app-current
      *ngIf="current !== undefined"
      [current]="current"
      [description]="description"
      [iconUrl]="iconUrl"
      >
      </app-current>
    </main>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  current: CurrentWeatherResponse | undefined;
  iconUrl: String | undefined;
  description: String | undefined;

  constructor(
    private _weatherHandlerService: WeatherHandlerService,
    private _httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getCoords ()
  }

  getCoords () {
    console.log('✅ called getCoords()')

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log('✅ inside geolocation', lat, lon)
        this._weatherHandlerService.getWeatherByCoords(lat, lon)
        .subscribe(
          (response) => {
            console.log('✅ received response', response);
            this.current = response;
            console.log('current', this.current);
            this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
            this.description = this.current?.weather[0]?.description;
          }
        )
      })
    }
  }

  replaceWithSearch(lat: Number, lon: Number) {
    return this._httpClient.get<CurrentWeatherResponse>
    (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=61a20f5d41830810abfcc3d15f5f1b2a&units=metric`)
    .subscribe(
      (response) => {
        console.log('✅ selected', response);
        this.current = response;
        console.log('current', this.current);
        this.iconUrl = `https://openweathermap.org/img/wn/${ this.current?.weather[0]?.icon }@2x.png`;
        this.description = this.current?.weather[0]?.description;
      }
    )
  }

}
