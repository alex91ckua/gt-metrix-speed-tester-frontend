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
  intervalIds = [];
  readonly UPDATE_INTERVAL = 10000; // in seconds

  constructor(private gtMetrixService: GtMetrixService) { }

  initIntervalCheck() {
    this.tests.forEach((test, i) => {
      if ( ['queued', 'started'].includes(test.state) ) {
        const intervalId = setInterval(() => {
          test.state = 'updating now';
          this.gtMetrixService.getTest(test.id).subscribe((data) => {
            // update test data
            this.tests[i] = data;
          });
        }, this.UPDATE_INTERVAL);

        this.intervalIds.push(intervalId);
      }
    });
  }

  ngOnInit() {
    this.gtMetrixService.getTests().subscribe((data) => {
      this.tests = data;
      this.loaded = true;
      this.initIntervalCheck();
    })
  }

  ngOnDestroy() {
    this.intervalIds.forEach(id => {
      clearInterval(id);
    });
  }

}
