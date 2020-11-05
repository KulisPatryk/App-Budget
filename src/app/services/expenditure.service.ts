import { Expenditure } from '../interfaces/expenditure.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const routes = {
  urlPost : 'http://localhost:8080/expenditures/all',
  urlGet : 'http://localhost:8080/expenditures/all',
  expenditure: (id: string) => `http://localhost:8080/expenditures/${id}`
}

@Injectable({
  providedIn: 'root'
})
export class ExpenditureService {
  categories = ['Spożywka','Paliwo','Inne','Opłaty','Prezenty','FastFood','Rozrywka','Rozwój'];
  costs: number[];
  test: number;
  action: any;
  expenditures: Expenditure[] =[];
  costOctoberPresents: number;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }
  public getExpeditures(): Observable<Expenditure[]>{
    return this.httpClient.get<Expenditure[]>(routes.urlGet);
  }

  public sendExpenditures(body: object = {}){
    console.log(body);
    return this.httpClient.post(routes.urlPost,body, this.options).toPromise().then(data=>{
      console.log(data);
      this._snackBar.open('Poprawnie dodano rekord', this.action ,{duration: 1000});
    });

  }
  deleteExpenditure(param: string): Observable<any> {
    return this.httpClient.delete< Observable<any>>(routes.expenditure(param));
  }
  getExpenditures(){
    this.getExpeditures().subscribe(
      (expenditures: Expenditure[]) => {
        this.expenditures = expenditures;
      });
  }
  countingCost(){
    this.getExpenditures();
    this.costs = [0,0,0,0,0,0,0,0];
    this.costOctoberPresents = 0;
    for(let i = 0; i < this.expenditures.length; i++){
      let d = new Date(this.expenditures[i].date);
      let n = d.getMonth()+1;
      if (n==10){
        for( let j = 0; j < 8; j++){
          if(this.expenditures[i].category === this.categories[j]){
            this.costs[j] = this.costs[j] + this.expenditures[i].price;
          }
        }
      }
    }
    this.test = this.costs[0]+this.costs[1]+this.costs[2]+this.costs[3]+this.costs[4]+this.costs[5]+this.costs[6]+this.costs[7];
    console.log('Pazdziernik wydatki:'+this.test);
    console.log('Na prezenty w pazdzierniku wydano:'+ this.costOctoberPresents);
  }
}
