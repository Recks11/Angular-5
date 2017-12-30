import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SigninComponent } from 'app/auth/signin/signin.component';
import { SignupComponent } from 'app/auth/signup/signup.component';
import { AuthRoutingModule } from 'app/auth/auth-routing.module';


@NgModule({
    declarations: [
    SignupComponent,
    SigninComponent
    ],
    imports: [
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}
