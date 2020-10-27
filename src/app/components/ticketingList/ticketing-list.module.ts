import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class TicketingListModule { }
