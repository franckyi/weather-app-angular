import { Component, OnInit } from '@angular/core';
import { WeatherHandlerService } from 'src/app/service/weather-handler.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-search',
  template: `
    <mat-form-field>
      <mat-label for="search-input">Search a place</mat-label>
      <input
        #query
        type="text"
        id="search-input"
        matInput placeholder="Ex. Ibiza"
      >
      <ul
        *ngIf="results !== null"
        class="results">
        <li *ngFor="let result of results; index as i" (click)="passSelected(i); query.value = ''">{{ i }} {{ result.name }}, {{ result.state }}, {{ result.country }}</li>
      </ul>
    </mat-form-field>
    <button mat-raised-button color="secondary"
      (click)="passQuery(query.value)">Check weather
    </button>
  `,
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

results: any | undefined;

  constructor(
    private _weatherHandlerService: WeatherHandlerService,
    private _appComponent: AppComponent,
  ) { }

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
    this._appComponent.replaceWithSearch(this.results[i].lat, this.results[i].lon);
    this.results = null;
  }

}

