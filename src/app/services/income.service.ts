import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Income } from '../interfaces/income.interface';
import { Observable } from 'rxjs';
import { MatSnackBar} from '@angular/material/snack-bar';

const routes = {
  urlPost : 'http://localhost:8080/income/all',
  urlGet : 'http://localhost:8080/income/all',
  income: (id: string) => `http://localhost:8080/income/${id}`
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  action: any;

  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }
  public getIncome(): Observable<Income[]>{
    return this.httpClient.get<Income[]>(routes.urlGet);
  }

  public sendIncome(body: object = {}){
    console.log(body);
    return this.httpClient.post(routes.urlPost,body, this.options).toPromise().then(data=>{
      console.log(data);
      this._snackBar.open('Poprawnie dodano rekord', this.action ,
      {duration: 1000});
    });

  }
  deleteIncome(param: string): Observable<any> {
    return this.httpClient.delete<Observable<any>>(routes.income(param));
  }
}