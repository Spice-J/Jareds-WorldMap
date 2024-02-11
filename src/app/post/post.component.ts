import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  
  //information header
  header: string = 'Country Data';

  // Pull data from WorldBank API
  http = inject(HttpClient);
  posts: any = [];

  ngOnInit(): void {
    this.fetchPosts();
  }
  fetchPosts() {
    this.http.get('http://api.worldbank.org/v2/country/?format=json').subscribe((posts: any) => {
      console.log(posts);
      this.posts = posts;
    })
  }
}
