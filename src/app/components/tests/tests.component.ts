import { Component, OnInit } from '@angular/core';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';
import { Test } from 'src/app/core/models/test.type';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  loaded = false;
  tests: Test[];

  constructor(private gtMetrixService: GtMetrixService) { }

  ngOnInit() {
    this.gtMetrixService.getTests().subscribe((data) => {
      this.tests = data;
      this.loaded = true;
    })
  }

}
