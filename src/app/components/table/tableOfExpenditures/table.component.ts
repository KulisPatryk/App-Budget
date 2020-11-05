import { Expenditure } from '../../../interfaces/expenditure.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ExpenditureService } from '../../../services/expenditure.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{
  categories = ['Spożywka','Paliwo','Inne','Opłaty','Prezenty','FastFood','Rozrywka','Rozwój',''];
  months = ['Wrzesień','Październik','Listopad','Grudzień','wszystko'];
  x: Number;
  costOctober: number;
  costSeptember: number;
  selectedValueMonth: string;
  selectedValue: string;
  public expeditures: Expenditure[];
  displayedColumns: string[] = ['name','category','price','place','date','delete','dialog'];
  dataSource: MatTableDataSource<Expenditure>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private expenditureService: ExpenditureService) { }

  ngOnInit() {
    this.getExpenditures();
  }
  deleteRecord(id: string){
    this.expenditureService.deleteExpenditure(id).subscribe(
    ()=>{
      console.log(`Product with Id=${id} deleted`);
      this.getExpenditures();
      this.ngOnInit();
    },
    (err) => console.log(err)
    );
  }
  applyFilterByCategory(value: string){
    const filterValue = value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterByMonth(value: string){
    this.x = 0;
    for(let i = 0; i<4; i++){
      if(value === this.months[i]){
         this.x = i+9;
      }
    }
    for(let i = 0; i< this.expeditures.length; i++){
      let d = new Date(this.expeditures[i].date);
      let n = d.getMonth()+1;
      if (this.x===n){
        if(this.x<10){
          const filterValue = '-0'+this.x+'-';
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
        else{
          console.log('listopad!'+this.x);
          const filterValue = '-'+this.x+'-';
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
      }
    }
    if(value === 'wszystko') {
      const filterValue = '';
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getExpenditures(){
    this.expenditureService.getExpeditures().subscribe(
      (expenditures: Expenditure[]) => {
        this.expeditures = expenditures;
        this.dataSource = new MatTableDataSource(expenditures);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
}
