import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../.././canvasjs.min';
import { ExpenditureService } from '../../services/expenditure.service';
import { Expenditure } from '../../interfaces/expenditure.interface';
//var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  categories = ['Spożywka','Paliwo','Inne','Opłaty','Prezenty','FastFood','Rozrywka','Rozwój'];
  costs: number[] = [110,10,10,0,0,0,0,0];
  expenditures: Expenditure[] = [];
  constructor(private exp: ExpenditureService){}
	ngOnInit() {
    this.exp.getExpeditures().subscribe(
      (expenditures: Expenditure[]) => {
        this.expenditures = expenditures;
        this.countingCostTest();
        let chart = new CanvasJS.Chart("chartContainer", {
          theme: "light2",
          animationEnabled: true,
          exportEnabled: true,
          title:{
            text: "Wydatki pazdziernik 2020"
          },
          data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "<b>{name}</b>: {y}zł (#percent%)",
            indexLabel: "{name} - #percent%",
            dataPoints: [
              { y: this.costs[0], name: this.categories[0] },
              { y: this.costs[1], name: this.categories[1] },
              { y: this.costs[2], name: this.categories[2] },
              { y: this.costs[3], name: this.categories[3] },
              { y: this.costs[4], name: this.categories[4] },
              { y: this.costs[5], name: this.categories[5] },
              { y: this.costs[6], name: this.categories[6] },
              { y: this.costs[7], name: this.categories[7] }
            ]
          }]
        });
        chart.render();
      });
  }
  countingCostTest(){
    this.costs = [0,0,0,0,0,0,0,0];
    for(let i = 0; i < this.expenditures.length; i++){
      let d = new Date(this.expenditures[i].date);
      let n = d.getMonth()+1;
      if (n==10){
        for( let j = 0; j < 8; j++){
          if(this.expenditures[i].category === this.categories[j]){
            this.costs[j] = this.costs[j] + this.expenditures[i].price;
            this.costs = this.costs.map(function(each_element){
              return Number(each_element.toFixed(2));
            });
          }
        }
      }
    }
  }
}
