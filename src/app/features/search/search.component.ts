import { Component, OnInit, Input } from '@angular/core';
import { WeatherHandlerService } from 'src/app/features/service/weather-handler.service';
import { CurrentWeatherResponse } from '../current/weather-response';

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
    this._weatherHandlerService.getWeatherByQuery(query)
    .subscribe(
      (response) => {
        console.log('✅ results received', response)
        this.results = response;
      }
    );
  }

  passSelected(i: any) {
    console.log('lat', this.results[i].lat)
    console.log('lon', this.results[i].lon)
    this._weatherHandlerService.getWeatherByCoords(this.results[i].lat, this.results[i].lon)
    .subscribe(
      (response) => {
        console.log('✅ selected', response);
        // this._weatherHandlerService.populateData(response);
      }
    );
  }

}

