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
  selectedCountryData: any = null;

  displayData(data: any){
    this.selectedCountryData = data
  }
  
}
