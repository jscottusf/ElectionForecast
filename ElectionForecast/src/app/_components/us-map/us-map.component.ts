import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MapStates } from '../../_services/map.service';
import { CSVService } from '../../_services/csv.service';
import { StateEstimate } from '../../_models/stateEstimate';

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
    }, 500);
  }
  setUnfillColor() {
    Object.keys(this.mapStates.statelist).forEach((id) => {
      document.getElementById(id).style.fill = this.colors.unfill;
    });
  }
  mouseEnter(ttid, e, id) {
    document.getElementById(id).style['stroke-width'] = '1.999999';
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
    let selectedstate = JSON.parse(JSON.stringify(this.change.currentValue));
    selectedstate = selectedstate.filter((data) => {
      return data.state === id;
    })[0];
    if (selectedstate && selectedstate.state === id) {
      this.showToolTip = true;
      selectedstate['state'] = this.mapStates.statelist[id];
      delete selectedstate.state;
      return Object.keys(selectedstate).map((key, value) => {
        return [key, selectedstate[key]];
      });
    }
  }
  positionToolTip(e, ttid) {
    document.getElementById(ttid).style.left = `${e.clientX + 2}px`;
    document.getElementById(ttid).style.top = `${e.clientY + 2}px`;
  }
}
