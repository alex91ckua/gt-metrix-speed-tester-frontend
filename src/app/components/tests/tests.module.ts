import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [TestsComponent],
  imports: [
    CommonModule,
    TestsRoutingModule,
    TooltipModule.forRoot(),
    FontAwesomeModule
  ]
})
export class TestsModule { }
