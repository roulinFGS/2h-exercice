import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ticket } from '../../../interfaces/ticket.interface';
import { User } from '../../../interfaces/user.interface';
import { finalize, tap } from 'rxjs/operators';
@Component({
  selector: 'app-ticketing-list',
  templateUrl: './ticketing-list.component.html',
  styleUrls: ['./ticketing-list.component.scss']
})

export class TicketingListComponent implements OnDestroy {
  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  public tickets: Ticket[];
  public newContent: FormGroup;
  private newTicketSubscription: Subscription;
  private ticketSubscription: Subscription;
  public loading = true;

  constructor(private readonly backendService: BackendService, public router: Router, private fb: FormBuilder) {
    this.newContent = fb.group({
      description: ['']
    })
    this.ticketSubscription = this.backendService.tickets()
    .pipe(
      tap(() => this.loading = false)
    )
    .subscribe(
      (tickets: Ticket[]) => this.tickets = tickets
    );

  }

  onSelectTicketClick(id: Number) {
    console.log("TicketingListComponent -> onTicketClick -> id", id);
    this.router.navigate(['/tickets'], { queryParams: { ticketId: id } });
  }

  onNewTicketClick($event: any) {
    const { target: { value } } = $event;
    this.loading = true;
    this.newTicketSubscription = this.backendService
    .newTicket({description: value })
    .pipe(
      finalize(() => {console.log('new Ticket complete'); this.newContent.reset(); this.loading = false;})
    )
    .subscribe();
  }

  ngOnDestroy() {
    this.newTicketSubscription && this.newTicketSubscription.unsubscribe();
    this.ticketSubscription && this.ticketSubscription.unsubscribe();
  }

}