import { Injectable, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CSVService {
  stateData: string = 'https://projects.fivethirtyeight.com/2020-general-data/presidential_state_toplines_2020.csv';
  nationalData: string = 'https://projects.fivethirtyeight.com/2020-general-data/presidential_national_toplines_2020.csv';

  constructor (private http: HttpClient) {}

  getStateData() {
   return this.http.get(this.stateData, {responseType: 'text'});
  }

  getNationalData() {
    return this.http.get(this.nationalData, {responseType: 'text'});
  }
}
