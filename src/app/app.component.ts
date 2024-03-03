import { Component } from '@angular/core';
import { SvgMap } from './worldmap/world-map.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SvgMap
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = `Jared's World Map`;

  clickedCountry: any = null;
  
  
}
