import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { TopupComponent } from './pages/topup/topup.component';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { PricingComponent } from './pages/pricing/pricing.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'account', component: AccountComponent
  },
  {
    path: 'topup', component: TopupComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'pricing', component: PricingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
