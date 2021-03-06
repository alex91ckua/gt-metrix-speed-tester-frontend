import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'my-account', loadChildren: () => import('./components/my-account/my-account.module').then(m => m.MyAccountModule) },
  { path: 'tests', loadChildren: () => import('./components/tests/tests.module').then(m => m.TestsModule) },
  { path: 'test/:id', loadChildren: () => import('./components/test/test.module').then(m => m.TestModule) },
  { path: 'new-test', loadChildren: () => import('./components/new-test/new-test.module').then(m => m.NewTestModule) },
  { path: '', loadChildren: () => import('./components/tests/tests.module').then(m => m.TestsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
