import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatInput} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PersonComponent
  ],
    imports: [
        CommonModule,
        PersonRoutingModule,
        FormsModule,
        MatButton,
        MatIconButton,
        MatInput,
        MatFormField,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule
    ]
})
export class PersonModule { }
