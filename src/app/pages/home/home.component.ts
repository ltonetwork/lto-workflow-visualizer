import { Component, OnInit } from '@angular/core';

declare var thesaas: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss',
    './css/core.min.css',
    './css/thesaas.min.css',
    './css/style.css'
  ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    thesaas.constellation();
  }

  showLoginModal() {
    console.log('Here comes modal');
  }

}
