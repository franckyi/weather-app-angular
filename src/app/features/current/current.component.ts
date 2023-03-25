import { Component, Input } from '@angular/core';
import { CurrentWeatherResponse } from 'src/app/features/current/weather-response';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent {

  @Input() current!: CurrentWeatherResponse | undefined;
  @Input() description!: String | undefined;
  @Input() iconUrl!: String | undefined;

}
