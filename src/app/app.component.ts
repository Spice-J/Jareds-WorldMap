import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgMap } from './worldmap/world-map.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SvgMap,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = `Jared's World Map`;
}
