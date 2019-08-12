import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'complaints',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'complaints', loadChildren: './complaints/complaints.module#ComplaintsPageModule' },
  { path: 'complaint', loadChildren: './complaint/complaint.module#ComplaintPageModule' },
  { path: 'new-complaint', loadChildren: './new-complaint/new-complaint.module#NewComplaintPageModule' },
  { path: 'resolve-complaint', loadChildren: './resolve-complaint/resolve-complaint.module#ResolveComplaintPageModule' },
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      // preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
