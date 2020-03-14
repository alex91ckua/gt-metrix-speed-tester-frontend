import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  appName = environment.appName;

  constructor() { }

  ngOnInit() {
  }

}
