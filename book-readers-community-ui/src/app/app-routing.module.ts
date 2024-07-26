import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TestComponent } from './test/test.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path:'login', component:LoginComponent
  },
  {
    path:'test', component:TestComponent
  },
  {
    path:'register', component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
