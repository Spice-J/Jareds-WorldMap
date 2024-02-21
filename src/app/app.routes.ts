import { Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { SvgMap } from './worldmap/world-map.component';

export const routes: Routes = [
    {path: './post/post.component.ts', component: PostComponent},
    {path: '', component: SvgMap}
];
