import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { TopupComponent } from './pages/topup/topup.component';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { PricingComponent } from './pages/pricing/pricing.component';
import { AuthGuard } from './auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "account",
    canActivate: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "account",
        loadChildren: "./pages/account/account.module#AccountModule"
      },
      {
        path: "topup",
        loadChildren: "./pages/topup/topup.module#TopupModule"
      },
      {
        path: "pricing",
        loadChildren: "./pages/pricing/pricing.module#PricingModule"
      },
      {
        path: "rooms",
        loadChildren: "./pages/rooms/rooms.module#RoomsModule"
      },
      {
        path: "profile",
        loadChildren: "./pages/profile/profile.module#ProfileModule"
      }
    ]
  },
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "home",
        loadChildren: "./public/public.module#PublicModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
