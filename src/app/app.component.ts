import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ROUTES } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  location: Location;
  private listTitles: any[];
  public ngOnInit(): void {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  constructor(location: Location) {
    this.location = location;
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }
    for(var item = 0; item < this.listTitles.length; item++){
      if(this.listTitles[item].path === titlee){
          return this.listTitles[item].title;
      }
  }
  return 'Strona Główna';
  }
}
