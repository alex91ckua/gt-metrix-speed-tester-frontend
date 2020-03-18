import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';


@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    RoundProgressModule
  ]
})
export class TestModule { }
