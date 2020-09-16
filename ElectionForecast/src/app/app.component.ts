import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('2020 FiveThirtyEight Forecast');
    this.meta.updateTag({
      name: 'description',
      content: '2020 FiveThirtyEight Forecast Redesign by Joel Scott',
    });
    this.meta.updateTag({
      property: 'og:image',
      content: './assets/electionjs.png',
      itemprop: 'image',
    });
    this.meta.updateTag({
      property: 'og:url',
      content: 'https://electionforecastjs.web.app/',
    });
    this.meta.updateTag({
      name: 'twitter:card"',
      content: 'summary_large_image',
    });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'FiveThirtyEight Election Forecast',
    });
  }
}
