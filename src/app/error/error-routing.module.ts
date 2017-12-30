import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from 'app/error/error/error.component';

const errorRoute = [
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forChild(errorRoute)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
