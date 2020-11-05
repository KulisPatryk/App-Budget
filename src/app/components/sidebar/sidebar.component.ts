import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  title: string;
  icon: string;
  subItems?: any;
}


export const ROUTES: RouteInfo[] = [
  { title: 'Tabele', icon: 'table_chart', subItems:[{name: 'Tabela wydatków', path: '/table1'}, {name: 'Tabela dochodów', path: '/table2'}]},
  { title: 'Budżet', icon: 'home', subItems:[{name: 'Pokaż Budżet', path: '/plot'}]},
  { title: 'Formularze', icon: 'input', subItems:[{name: 'Wprowadź dane', path: '/form'}]},
  { title: 'Wykresy', icon: 'analytics', subItems:[{name: 'Wykres miesięczny', path: '/charts'}]}

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  showSubmenu: boolean = false;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  visibleIndex = -1;
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }
}
