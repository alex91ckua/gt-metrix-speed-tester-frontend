import { Component, OnInit } from '@angular/core';
import { GtMetrixService } from 'src/app/core/services/gt-metrix.service';
import { Test } from 'src/app/core/models/test.type';
import { faSync, faFilter } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  showFilters = '0';
  readonly faSync = faSync;
  readonly faFilter = faFilter;
  loaded = false;
  tests: Test[];
  intervalIds = [];
  readonly UPDATE_INTERVAL = 10000; // in seconds

  filtersModel = {
    url: '',
    pagescoreFrom: null,
    pagescoreTo: null,
    yslowFrom: null,
    yslowTo: null,
  }

  constructor(private gtMetrixService: GtMetrixService) { }

  initIntervalCheck() {
    this.tests.forEach((test, i) => {
      if ( ['queued', 'started'].includes(test.state) ) {
        const intervalId = setInterval(() => {
          this.gtMetrixService.getTest(test.id).subscribe((data) => {
            // update test data
            this.tests[i] = data;
          });
        }, this.UPDATE_INTERVAL);

        this.intervalIds.push(intervalId);
      }
    });
  }

  onFiltersSubmit() {
    // console.log(this.filtersModel);
    this.tests.forEach((test, i) => {
      this.tests[i].hidden = false;
      if (this.filtersModel.url.length !== 0) {
        if (test.url.indexOf(this.filtersModel.url) === -1) {
          this.tests[i].hidden = true;
        }
      }

      if (this.filtersModel.pagescoreFrom !== null) {
        if (!(test.results.pagespeed_score >= this.filtersModel.pagescoreFrom)) {
          this.tests[i].hidden = true;
        }
      }

      if (this.filtersModel.pagescoreTo !== null) {
        if (!(test.results.pagespeed_score <= this.filtersModel.pagescoreTo)) {
          this.tests[i].hidden = true;
        }
      }

      if (this.filtersModel.yslowFrom !== null) {
        if (!(test.results.yslow_score >= this.filtersModel.yslowFrom)) {
          this.tests[i].hidden = true;
        }
      }

      if (this.filtersModel.yslowTo !== null) {
        if (!(test.results.yslow_score <= this.filtersModel.yslowTo)) {
          this.tests[i].hidden = true;
        }
      }

    });
  }

  onClearFilters(){
    this.tests.forEach((test, i) => {
      this.tests[i].hidden = false;
    })

    this.filtersModel = {
      url: '',
      pagescoreFrom: null,
      pagescoreTo: null,
      yslowFrom: null,
      yslowTo: null,
    }    
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
