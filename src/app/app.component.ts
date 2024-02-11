import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SvgMap } from './worldmap/world-map.component';
import { HttpClientModule } from '@angular/common/http';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SvgMap,
    HttpClientModule,
    PostComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
