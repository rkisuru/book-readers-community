import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {authGuard} from "./services/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path: 'books', loadChildren: ()=> import('./modules/book/book.module').then(
      m=> m.BookModule
    ),
    canActivate: [authGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
