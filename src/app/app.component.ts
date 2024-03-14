import { Component } from '@angular/core';
import { SvgMap } from './worldmap/world-map.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SvgMap,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = `Jared's World Map`;

  //Access API data from world-map component to display
  selectedCountryData: any = null;
  clickText: any = 'Click a country to see information.'

  displayData(data: any){
    this.selectedCountryData = data
  }
  
}
