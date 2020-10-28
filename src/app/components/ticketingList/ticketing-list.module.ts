import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketingListComponent } from './ticketing-list.component';

const routes: Routes = [
  {
    path: '',
    component: TicketingListComponent
  }
];

@NgModule({
  declarations: [TicketingListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class TicketingListModule { }
