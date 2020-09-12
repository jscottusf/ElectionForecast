import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../_services/csv.service';
import { StateEstimate } from '../../_models/stateEstimate';
import { NationalEstimate } from '../../_models/nationalEstimate';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  csvContent: string;
  stateData: StateEstimate[];
  nationalData: NationalEstimate[];
  nationalProjection: NationalEstimate;
  chart = [];
  favorite: string;
  likelyhood: string;
  likelyhoodNum: number;
  likelyVerb: string;

  constructor(private csvService: CSVService) {
    this.getStateData();
    this.getNationalData();
  }

  ngOnInit(): void {}

  getStateData() {
    this.csvService.getStateData().subscribe((data) => {
      this.stateData = this.onFileLoad(data);
    });
  }

  getNationalData() {
    this.csvService.getNationalData().subscribe((data) => {
      this.nationalData = this.onFileLoad(data);
      this.nationalProjection = this.nationalData[0];
      this.favorite =
        this.nationalProjection.ecwin_inc > this.nationalProjection.ecwin_chal
          ? this.nationalProjection.candidate_inc
          : this.nationalProjection.candidate_chal;
      this.likelyhood =
        this.favorite == this.nationalProjection.ecwin_inc
          ? this.nationalProjection.ecwin_inc
          : this.nationalProjection.ecwin_chal;
      console.log(this.likelyhood);
      this.likelyhoodNum = parseFloat(this.likelyhood) * 100;
      console.log(this.likelyhoodNum);
      if (this.likelyhood < '.70') {
        this.likelyVerb = 'slightly favored';
      } else if (this.likelyhood < '.90' && this.likelyhood >= '.70') {
        this.likelyVerb = 'favored';
      } else {
        this.likelyVerb = 'very likely';
      }
      this.chartData();
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

  chartData() {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: [
          this.nationalProjection.candidate_inc,
          this.nationalProjection.candidate_chal,
        ],
        datasets: [
          {
            data: [
              this.nationalProjection.ecwin_inc,
              this.nationalProjection.ecwin_chal,
            ],
            borderColor: 'white',
            backgroundColor: ['#ff5e40', '#179edf'],
            fill: true,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var index = tooltipItem.index;
              var currentValue = dataset.data[index];
              var percentage = Math.floor(currentValue * 100 + 0.5);
              return (
                ' ' +
                data.labels[index] +
                ' wins the election ' +
                percentage +
                '% of the time'
              );
            },
          },
        },
      },
    });
  }
}
