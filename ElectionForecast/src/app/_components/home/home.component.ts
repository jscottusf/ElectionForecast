import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../_services/csv.service';
import { StateEstimate } from '../../_models/stateEstimate';
import { NationalEstimate } from '../../_models/nationalEstimate';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  csvContent: string;
  stateData: StateEstimate[];
  nationalData: NationalEstimate[];

  constructor(private csvService: CSVService) {
    this.getStateData();
    this.getNationalData();
  }

  ngOnInit(): void {}

  getStateData() {
    this.csvService.getStateData().subscribe((data) => {
      this.stateData = this.onFileLoad(data);
      console.log(this.stateData);
    });
  }

  getNationalData() {
    this.csvService.getNationalData().subscribe((data) => {
      this.nationalData = this.onFileLoad(data);
    });
  }

  onFileLoad(csv) {
    const textFromFileLoaded = csv;

    let flag = false;
    let objarray: Array<any> = [];
    let prop: Array<any> = [];
    let size: any = 0;

    for (const line of textFromFileLoaded.split(/[\r\n]+/)) {
      if (flag) {
        let obj = {};
        for (let k = 0; k < size; k++) {
          obj[prop[k]] = line.split(',')[k];
        }
        objarray.push(obj);
      } else {
        for (let k = 0; k < line.split(',').length; k++) {
          size = line.split(',').length;
          prop.push(line.split(',')[k].replace(/ /g, ''));
        }
        flag = true;
      }
    }

    return objarray;
  }
}
