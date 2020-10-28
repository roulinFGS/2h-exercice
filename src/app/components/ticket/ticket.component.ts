import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';
import { Ticket } from 'src/interfaces/ticket.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})

export class TicketComponent implements OnInit, OnDestroy {
  public readonly users$: Observable<User[]> = this.backendService.users();
  private idSubscription: Subscription;
  private completedSubscription: Subscription;
  ticketForm: FormGroup;
  id= null;
  constructor(private readonly backendService: BackendService, public activatedRoute: ActivatedRoute, private fb: FormBuilder) { 
  }
  //ticket
  ngOnInit(): void {
    this.idSubscription = this.activatedRoute.queryParams
    .pipe(
      mergeMap((params: { ticketId }) => {
        this.id = params.ticketId;
        return this.backendService.ticket(params.ticketId);        
      })
    )
    .subscribe((ticket: Ticket) => {
      this.ticketForm = this.getTicketForm(ticket);
      this.handleCompletionPipes();
      this.handleAssignementPipes();
    },
    err => {  /** TODO */}
    );
  }

  handleCompletionPipes() {
    const completedObservable = this.ticketForm.get('completed');
    this.completedSubscription = completedObservable.valueChanges
    .pipe(
      mergeMap((completed: boolean) => {
        return this.backendService.complete(this.id, completed);        
      })
    )
    .subscribe(value => console.log('completed !!!! ', value));
    // todo error handling?
  }

  handleAssignementPipes() {
    const completedObservable = this.ticketForm.get('assigneeId');
    this.completedSubscription = completedObservable.valueChanges
    .pipe(
      debounceTime(800),
      mergeMap((assigneeId: number) => {
        return this.backendService.assign(this.id, assigneeId);        
      })
    )
    .subscribe(value => console.log('assignee !!!! ', value));
    // todo error handling?
  }

  getTicketForm(ticket: Ticket): FormGroup {
    const values = {
      id: { value: ticket.id, disabled: true },
      completed: ticket.completed,
      assigneeId: ticket.assigneeId,
      description: { value: ticket.description, disabled: true }
    }

    return this.fb.group(values);
  }

  ngOnDestroy() {
    this.idSubscription && this.idSubscription.unsubscribe();
    this.completedSubscription && this.completedSubscription.unsubscribe();
  }
}