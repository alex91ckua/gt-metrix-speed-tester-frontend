import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTestRoutingModule } from './new-test-routing.module';
import { NewTestComponent } from './new-test.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [NewTestComponent],
  imports: [
    CommonModule,
    NewTestRoutingModule,
    AlertModule.forRoot(),
    TooltipModule.forRoot()
  ]
})
export class NewTestModule { }
