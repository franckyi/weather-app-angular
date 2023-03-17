import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from './current-weather-response';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private _httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  getRemoteWeather(query: String) {
    console.log(query)

    return this._httpClient.get<CurrentWeatherResponse>(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=61a20f5d41830810abfcc3d15f5f1b2a`)
  }

}

