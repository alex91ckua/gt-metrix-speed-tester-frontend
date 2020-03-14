import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'my-account', loadChildren: () => import('./components/my-account/my-account.module').then(m => m.MyAccountModule) },
  { path: 'tests', loadChildren: () => import('./components/tests/tests.module').then(m => m.TestsModule) },
  { path: '', loadChildren: () => import('./components/tests/tests.module').then(m => m.TestsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
