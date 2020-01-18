import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './public/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { TopupComponent } from './pages/topup/topup.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    TopupComponent,
    LoginComponent,
    RegisterComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule,
    AppRoutingModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
