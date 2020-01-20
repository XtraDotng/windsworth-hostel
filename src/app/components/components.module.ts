import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DxVectorMapModule } from "devextreme-angular";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    FooterComponent, 
    NavbarComponent, 
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule, 
    FormsModule, 
    JwBootstrapSwitchNg2Module, 
    NgbModule, 
    DxVectorMapModule
  ],
  exports: [
    FooterComponent, 
    NavbarComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
