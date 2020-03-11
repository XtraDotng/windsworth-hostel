import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NgbModule,
    ComponentsModule,
    FormsModule,
    NgxDatatableModule
  ]
})
export class AccountModule { }
