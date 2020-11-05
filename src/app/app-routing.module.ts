import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components/table/tableOfExpenditures/table.component';
import { FormComponent } from './components/form/form.component';
import { PlotsComponent } from './components/plots/plots.component';
import { TableOfIncomeComponent } from './components/table/tableOfIncome/table-of-income/table-of-income.component';
import { ChartsComponent } from './components/charts/charts.component';

const routes: Routes = [
  {
    path: 'table1', //table
    component: TableComponent
  },
  {
    path: 'table2', //table
    component: TableOfIncomeComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'plot',
    component: PlotsComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
