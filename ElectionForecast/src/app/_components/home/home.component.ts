import { Component, OnInit } from '@angular/core';
import { CSVService } from '../../_services/csv.service';
import { StateEstimate } from '../../_models/stateEstimate';
import { NationalEstimate } from '../../_models/nationalEstimate';
import { Chart } from 'chart.js';
import * as moment from 'moment';

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
  linechart = [];
  lineLabels = [];
  lineDataBiden = [];
  lineDataTrump = [];
  favorite: string;
  likelyhood: string;
  likelyhoodNum: number;
  likelyVerb: string;
  lastUpdate: any;
  lastUpdateTime: string;

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
        this.favorite == this.nationalProjection.candidate_inc
          ? this.nationalProjection.ecwin_inc
          : this.nationalProjection.ecwin_chal;
      this.likelyhoodNum = parseFloat(this.likelyhood) * 100;
      if (this.likelyhood < '.70') {
        this.likelyVerb = 'slightly favored';
      } else if (this.likelyhood < '.90' && this.likelyhood >= '.70') {
        this.likelyVerb = 'favored';
      } else {
        this.likelyVerb = 'very likely';
      }
      this.lineLabels = this.nationalData.map((data) => {
        return data.modeldate === undefined ? '' : data.modeldate;
      });
      this.lineDataBiden = this.nationalData.map((data) => {
        let bidenWin = parseFloat(data.ecwin_chal) * 100;
        return Math.round(bidenWin);
      });
      this.lineDataTrump = this.nationalData.map((data) => {
        let trumpWin = parseFloat(data.ecwin_inc) * 100;
        return Math.round(trumpWin);
      });
      this.lineLabels.reverse();
      this.lineDataBiden.reverse();
      this.lineDataTrump.reverse();
      this.chartData();
      this.chartLineData();
      let timestamp = this.nationalProjection.timestamp;
      this.lastUpdate = moment(timestamp).format('MMMM Do YYYY [at] h:mm a');
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

  chartLineData() {
    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
      draw: function (ease) {
        Chart.controllers.line.prototype.draw.call(this, ease);

        if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
          var activePoint = this.chart.tooltip._active[0],
            ctx = this.chart.ctx,
            x = activePoint.tooltipPosition().x,
            topY = this.chart.scales['y-axis-0'].top,
            bottomY = this.chart.scales['y-axis-0'].bottom;

          // draw line
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x, topY);
          ctx.lineTo(x, bottomY);
          ctx.lineWidth = 3;
          ctx.strokeStyle = 'black';
          ctx.stroke();
          ctx.restore();
        }
      },
    });
    this.chart = new Chart('line', {
      type: 'LineWithLine',
      data: {
        labels: this.lineLabels,
        datasets: [
          {
            label: 'Biden',
            fill: false,
            borderColor: '#179edf',
            backgroundColor: '#179edf',
            pointBackgroundColor: '#179edf',
            pointBorderColor: '#179edf',
            pointHoverBackgroundColor: '#179edf',
            pointHoverBorderColor: '#179edf',
            borderWidth: 8,
            data: this.lineDataBiden,
          },
          {
            fill: false,
            label: 'Trump',
            fillColor: '#ff5e40',
            pointColor: '#ff5e40',
            borderColor: '#ff5e40',
            pointBackgroundColor: '#ff5e40',
            pointBorderColor: '#ff5e40',
            pointHoverBackgroundColor: '#ff5e40',
            pointHoverBorderColor: '#ff5e40',
            borderWidth: 8,
            data: this.lineDataTrump,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function (tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var index = tooltipItem.index;
              var currentValue = dataset.data[index];
              return (
                ' ' +
                dataset.label +
                ' wins the election ' +
                currentValue +
                '% of the time'
              );
            },
          },
        },
        hover: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  }
}
