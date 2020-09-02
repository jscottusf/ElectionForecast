import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../_services/csv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  csvContent: string;
  stateData: any[] = [];
  nationalData: any[] = [];

  constructor(private csvService: CSVService) { }

  ngOnInit(): void {
    this.getStateData();
    this.getNationalData();
  }

  getStateData() {
    this.csvService.getStateData().subscribe(data => {
      this.stateData = this.onFileLoad(data);
      console.log(this.stateData);
    });
  }

  getNationalData() {
    this.csvService.getNationalData().subscribe(data => {
      this.nationalData = this.onFileLoad(data);
      console.log(this.nationalData);
    })
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
          obj[prop[k]] = line.split(',')[k]
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