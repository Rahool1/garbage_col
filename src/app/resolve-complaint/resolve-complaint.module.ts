import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResolveComplaintPage } from './resolve-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: ResolveComplaintPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResolveComplaintPage]
})
export class ResolveComplaintPageModule {}
