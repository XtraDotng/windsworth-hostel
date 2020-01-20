import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopupRoutingModule } from './topup-routing.module';
import { TopupComponent } from './topup.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [TopupComponent],
  imports: [
    CommonModule,
    TopupRoutingModule,
    FormsModule
  ]
})
export class TopupModule { }
