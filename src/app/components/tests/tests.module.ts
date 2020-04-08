import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsComponent } from './tests.component';
import { TooltipModule } from 'ngx-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestsComponent],
  imports: [
    CommonModule,
    TestsRoutingModule,
    TooltipModule.forRoot(),
    FontAwesomeModule,
    ButtonsModule.forRoot(),
    FormsModule
  ]
})
export class TestsModule { }
