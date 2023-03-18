import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from '../weather-response';
import { WeatherComponent } from 'src/app/features/current-weather/weather/weather.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _weatherComponent: WeatherComponent) { }

  ngOnInit(): void {
  }

  passQuery(query: String) {
    this._weatherComponent.getRemoteWeather(query)
  }

}

