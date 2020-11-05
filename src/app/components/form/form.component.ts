import { Expenditure } from '../../interfaces/expenditure.interface';
import { Component, OnInit} from '@angular/core';
import { ExpenditureService } from '../../services/expenditure.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter } from '../../date/app-date-adapter';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MomentUtcDateAdapter } from '../../date/moment-utc-date-adapter';
import { Income } from '../../interfaces/income.interface';
import { IncomeService } from '../../services/income.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ]
})
export class FormComponent implements OnInit {
  categories = ['Spożywka','Paliwo','Inne','Opłaty','Prezenty','FastFood','Rozrywka','Rozwój'];
  categoriesIncome = ['Stypendium','Prezent','Inne','Terapia','śpiew','Praca',''];
  names = ['Patryk','Basia'];
  income: Income = {} as Income;
  expenditure: Expenditure = {} as Expenditure;
  month: string;
  json;
  constructor(private expenditureService: ExpenditureService, private incomeService: IncomeService) {
      this.expenditure.date;
      this.expenditure.category;
      this.expenditure.name;
      this.expenditure.place;
      this.expenditure.price;
      this.income.name;
      this.income.price;
      this.income.kind;
      this.income.category
      this.income.date;
  }
    ngOnInit() {
    }
  sendIncomeData(){
    this.json = JSON.stringify(this.income);
    this.incomeService.sendIncome(this.json);
    this.incomeService.getIncome();
    this.income.name = '';
    this.income.category = '';
    this.income.kind = '';
    this.income.price = 0;
  }
  sendData(){
    this.json = JSON.stringify(this.expenditure);
    console.log(this.json);
    this.expenditureService.sendExpenditures(this.json);
    this.expenditureService.getExpeditures();
    this.expenditure.name = '';
    this.expenditure.price = 0.00;
    this.expenditure.place = '';
    this.expenditure.category = '';
  }
}
