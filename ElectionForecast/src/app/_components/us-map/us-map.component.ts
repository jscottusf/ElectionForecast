import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MapStates } from '../../_services/map.service';
import { CSVService } from '../../_services/csv.service';
import { StateEstimate } from '../../_models/stateEstimate';
import { Chart } from 'chart.js';

@Component({
  selector: 'us-map',
  templateUrl: './us-map.component.html',
  styleUrls: ['./us-map.component.css'],
})
export class UsMapComponent implements OnInit {
  @Input()
  ids: any;
  @Input()
  enableTooltip: boolean;
  @Input()
  toolTipObject: any;
  colors: any = {
    leansD: '#d2e4fa',
    likelyD: '#7db9f2',
    solidD: '#2aa1ec',
    leansR: '#ffc2b5',
    likelyR: '#ff9987',
    solidR: '#fe6a59',
  };
  showToolTip: boolean;
  change: any;
  stateEstimates: StateEstimate[];
  selected: StateEstimate;
  leftBar: any;
  rightBar: any;
  background: any;
  voteBackground: any;

  constructor(public mapStates: MapStates) {}
  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      //this.setUnfillColor();
      this.change = JSON.parse(JSON.stringify(changes.ids));
      this.change.currentValue.forEach((data) => {
        let stateId = document.getElementById(data.state);
        if (stateId) {
          let incWin = data.winstate_inc * 100;
          if (incWin >= 90) {
            stateId.style.fill = this.colors.solidR;
          } else if (incWin >= 70 && incWin < 90) {
            stateId.style.fill = this.colors.likelyR;
          } else if (incWin >= 50 && incWin < 70) {
            stateId.style.fill = this.colors.leansR;
          } else if (incWin < 50 && incWin >= 30) {
            stateId.style.fill = this.colors.leansD;
          } else if (incWin < 30 && incWin >= 10) {
            stateId.style.fill = this.colors.likelyD;
          } else if (incWin < 10) {
            stateId.style.fill = this.colors.solidD;
          }
        } else {
          console.log(data.state);
        }
      });
    }, 1000);
  }
  setUnfillColor() {
    Object.keys(this.mapStates.statelist).forEach((id) => {
      document.getElementById(id).style.fill = this.colors.unfill;
    });
  }
  mouseEnter(ttid, e, id) {
    document.getElementById(id).style['stroke-width'] = '3';
    if (this.enableTooltip) {
      this.toolTipObject = this.createToolTipData(event, id);
      this.positionToolTip(e, ttid);
    }
  }
  mouseLeave(ttid, e, id) {
    document.getElementById(id).style['stroke-width'] = '0.970631';
    if (this.enableTooltip) {
      this.showToolTip = false;
      this.toolTipObject = {};
    }
  }
  createToolTipData(event, id) {
    this.showToolTip = true;
    let selectedstates = this.change.currentValue;
    selectedstates.filter((data) => {
      if (data.state === id) {
        this.selected = data;
        let leftBar = data.winstate_chal * 100 + '%';
        let rightBar = data.winstate_inc * 100 + '%';
        this.background =
          leftBar > rightBar
            ? 'linear-gradient(to right, #179edf ' +
              leftBar +
              ', #ff5e40 ' +
              rightBar +
              ')'
            : 'linear-gradient(to left, #ff5e40 ' +
              rightBar +
              ', #179edf ' +
              leftBar +
              ')';

        this.voteBackground =
          data.voteshare_chal > data.voteshare_inc
            ? 'linear-gradient(to right, #179edf ' +
              data.voteshare_chal +
              '%' +
              ', #ff5e40 ' +
              data.voteshare_inc +
              '%' +
              ')'
            : 'linear-gradient(to left, #ff5e40 ' +
              data.voteshare_inc +
              '%' +
              ', #179edf ' +
              data.voteshare_chal +
              '%' +
              ')';
      }
    });
  }

  positionToolTip(e, ttid) {
    document.getElementById(ttid).style.left = `${e.clientX + 2}px`;
    document.getElementById(ttid).style.top = `${e.clientY + 2}px`;
  }
}
