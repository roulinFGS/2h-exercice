import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'ticketing-list',
    loadChildren: './components/ticketingList/ticketing-list.module#TicketingListModule'
  },
  {
    path: '',
    redirectTo: '/ticketing-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
