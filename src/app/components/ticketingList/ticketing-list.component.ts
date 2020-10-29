import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Ticket } from '../../../interfaces/ticket.interface';
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: 'app-ticketing-list',
  templateUrl: './ticketing-list.component.html',
  styleUrls: ['./ticketing-list.component.scss']
})

export class TicketingListComponent implements OnInit, OnDestroy {
  public tickets: Ticket[];
  public newTicket = '';
  private newTicketSubscription: Subscription;
  private ticketSubscription: Subscription;
  public loading: boolean;

  constructor(private readonly backendService: BackendService, public router: Router) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.ticketSubscription = this.backendService.tickets()
    .pipe(
      tap(() => this.loading = false)
    )
    .subscribe(
      (tickets: Ticket[]) => this.tickets = tickets
    );
  }

  onSelectTicketClick(id: number): void {
    this.router.navigate(['/tickets'], { queryParams: { ticketId: id } });
  }

  onNewTicketClick($event: any): void {
    const value = $event.target ? $event.target.value : null;
    this.loading = true;
    this.newTicketSubscription = this.backendService
    .newTicket({description: value })
    .pipe(
      finalize(() => { this.newTicket = ''; this.loading = false; })
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.newTicketSubscription?.unsubscribe();
    this.ticketSubscription?.unsubscribe();
  }

}
