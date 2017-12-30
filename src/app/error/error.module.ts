import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error/error.component';
import { ErrorRoutingModule } from 'app/error/error-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ErrorRoutingModule
  ],
  declarations: [ErrorComponent]
})
export class ErrorModule { }
