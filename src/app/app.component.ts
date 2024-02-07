import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgMap } from './worldmap/world-map.component';
import { InfosectionComponent } from './infosection/infosection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SvgMap,
    InfosectionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string = 'World Map';
}
