import { Component, OnInit, Inject} from '@angular/core';
import { Expenditure } from '../../interfaces/expenditure.interface';
import { ExpenditureService } from '../../services/expenditure.service';
import { IncomeService } from '../../services/income.service';
import { Income } from '../../interfaces/income.interface';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss']
})
export class PlotsComponent implements OnInit {
  costOctober: number;
  totalExpenditures: number;
  actual: number;
  totalIncome: number;
  costOctoberPresents: number;
  incomeOctober: number;
  costSeptember: number;
  expenditures: Expenditure[] = [];
  income: Income[] = [];
  constructor(private expenditureService: ExpenditureService, private incomeService: IncomeService,
              public dialog: MatDialog, public dialogIncome: MatDialog) { }

  openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverviewExpenditures, {
            width: '350px',
            height: '450px',
            data: {name: this.expenditures}
        });
  }
  openDialogIncome(): void {
    const dialogRef = this.dialogIncome.open(DialogOverviewIncome, {
        width: '350px',
        height: '350px',
        data: {name: this.income}
    });
}
  ngOnInit(): void {
    combineLatest([this.expenditureService.getExpeditures(), this.incomeService.getIncome()])
    .subscribe(([expenditures,income])=>{
      this.expenditures = expenditures;
      this.income = income;
      this.actualMoney();
      this.countingCost();
    })
  }

  actualMoney(){
    this.totalExpenditures = 0;
    this.totalIncome = 0;
    for(let i = 0; i < this.expenditures.length; i++){
        this.totalExpenditures =  this.totalExpenditures + this.expenditures[i].price;
    }
    for(let i = 0; i < this.income.length; i++){
      this.totalIncome =  this.totalIncome + this.income[i].price;
    }
    console.log(this.totalExpenditures);
    console.log(this.totalIncome);
    this.actual = this.totalIncome - this.totalExpenditures;
  }

  countingCost(){
    this.costOctoberPresents = 0;
    this.incomeOctober = 0;
    this.costOctober = 0;
    this.costSeptember = 0;
    for(let i = 0; i < this.expenditures.length; i++){
      let d = new Date(this.expenditures[i].date);
      let n = d.getMonth()+1;
      if (n==10){
        this.costOctober = this.costOctober + this.expenditures[i].price;
      }
      else if (n===9){
        this.costSeptember = this.costSeptember + this.expenditures[i].price;
      }
    }
    for(let i = 0; i< this.income.length; i++){
      let d = new Date(this.income[i].date);
      let n = d.getMonth()+1;
      if (n==10){
        this.incomeOctober = this.incomeOctober + this.income[i].price;
      }
    }
    console.log('Koszt wydatków za pazdziernik to: '+ this.costOctober);
    console.log('Koszt zarobku za wrzesień to: '+ this.incomeOctober);
  }
}


@Component({
  selector: 'dialog-overview-expenditures',
  templateUrl: 'dialog-overview-expenditures.html',
})
export class DialogOverviewExpenditures implements OnInit {
  categories = ['Spożywka','Paliwo','Inne','Opłaty','Prezenty','FastFood','Rozrywka','Rozwój'];
  costs: number[] = [0,0,0,0,0,0,0,0];
  expenditures: Expenditure[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExpenditures>,
    @Inject(MAT_DIALOG_DATA) public data: PlotsComponent,
    private exp: ExpenditureService) {}

  ngOnInit(){
    this.exp.getExpeditures().subscribe(
      (expenditures: Expenditure[]) => {
        this.expenditures = expenditures;
        this.countingCostTest();
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
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
@Component({
  selector: 'dialog-overview-income',
  templateUrl: 'dialog-overview-income.html',
})
export class DialogOverviewIncome {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewIncome>,
    @Inject(MAT_DIALOG_DATA) public data: Income) {}

    onNoClick(): void {
    this.dialogRef.close();
  }
}

