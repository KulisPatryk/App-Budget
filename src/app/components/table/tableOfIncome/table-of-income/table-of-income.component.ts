import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { IncomeService } from '../../../../services/income.service';
import { Income } from '../../../../interfaces/income.interface';
@Component({
  selector: 'app-table-of-income',
  templateUrl: './table-of-income.component.html',
  styleUrls: ['./table-of-income.component.scss']
})
export class TableOfIncomeComponent implements OnInit {
  categories = ['Stypendium','Prezent','Inne','Terapia','śpiew','Praca',''];
  months = ['Wrzesień','Październik','Listopad','Grudzień','wszystko'];
  x: Number;
  income: Income[];
  selectedValueMonth: string;
  selectedValue: string;
  displayedColumns: string[] = ['name','category','price','kind','date','delete','dialog'];
  dataSource: MatTableDataSource<Income>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.getIncome();
  }

  deleteRecord(id: string){
    this.incomeService.deleteIncome(id).subscribe(
    ()=>{
      console.log(`Product with Id=${id} deleted`);
      this.getIncome();
      this.ngOnInit();
    },
    (err) => console.log(err)
    );
  }
  getIncome(){
    this.incomeService.getIncome().subscribe(
      (income: Income[]) => {
        this.income = income;
        this.dataSource = new MatTableDataSource(income);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
}