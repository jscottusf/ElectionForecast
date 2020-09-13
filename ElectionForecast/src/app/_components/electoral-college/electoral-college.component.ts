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

  ngOnInit() {
    this.mapStates();
  }

  mapStates() {
    this.stateData = this.stateEstimates.slice(0, 56).map((state) => {
      return state;
    });
  }
}
