import { Component, OnInit } from '@angular/core';
import { CurrentWeatherResponse } from '../weather-response';
import { WeatherHandlerService } from 'src/app/features/current-weather/weather-handler.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any | undefined;

  constructor(private _weatherHandlerService: WeatherHandlerService) { }

  ngOnInit(): void {
  }

  passQuery(query: String) {
    console.log(query);
    this._weatherHandlerService.getRemoteWeather(query)
    .subscribe(
      (response) => {                           //next() callback
        console.warn('✅ response received')
        console.log('response', response);
        this.results = response;
      }
    );

  }

}

