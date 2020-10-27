import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Ticket } from '../../../interfaces/ticket.interface';
import { User } from '../../../interfaces/user.interface';
@Component({
  selector: 'app-ticketing-list',
  templateUrl: './ticketing-list.component.html'
})

export class TicketingListComponent implements OnInit {
  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  private ticketId = null;
  constructor(private readonly backendService: BackendService, public router: Router) { }

  ngOnInit(): void {
  }

  onAddClick() {
    console.log("TicketingListComponent -> onAddClick -> value", this.ticketId);
    this.router.navigate(['/tickets'], { queryParams: { ticketId: this.ticketId } });
  }
}