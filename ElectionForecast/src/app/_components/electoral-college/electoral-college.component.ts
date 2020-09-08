import { Component, OnInit, Input } from '@angular/core';
import { StateEstimate } from '../../_models/stateEstimate';

@Component({
  selector: 'electoral-college',
  templateUrl: './electoral-college.component.html',
  styleUrls: ['./electoral-college.component.css'],
})
export class ElectoralCollegeComponent implements OnInit {
  @Input() stateEstimates: StateEstimate[];
  stateData: StateEstimate[];

  constructor() {}

  ngOnInit() {}

  mapStates() {
    this.stateData = this.stateEstimates.slice(0, 55).map((state) => {
      return state;
    });
    console.log(this.stateData);
  }

  selectedState: any = [
    { code: 'North Dakota', users: 324, 'org type': 'Service Provider' },
    { code: 'Washington', users: 454, 'org type': 'Manufacturer' },
    { code: 'Arizona', users: 234, 'org type': 'Service Provider' },
    { code: 'Alaska', users: 544, 'org type': 'Manufacturer' },
    { code: 'Connecticut', users: 544, 'org type': 'Manufacturer' },
    { code: 'Florida', users: 544, 'org type': 'Manufacturer' },
  ];
}
