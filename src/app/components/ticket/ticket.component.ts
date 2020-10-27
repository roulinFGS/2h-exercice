import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../backend.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ticket } from '../../../interfaces/ticket.interface';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html'
})

export class TicketComponent implements OnInit, OnDestroy {
  public readonly users$: Observable<User[]> = this.backendService.users();
  public readonly tickets$: Observable<Ticket[]> = this.backendService.tickets();
  private sub: Subscription
  ticketForm: FormGroup;
  id= null;
  constructor(private readonly backendService: BackendService, public activatedRoute: ActivatedRoute, private fb: FormBuilder) { 
    this.ticketForm = this.fb.group({
      completed: [false, [Validators.required]], // boolean
      assigneeId: [null], // number
      description: ['', [Validators.required]] // string
    })
  }

  ngOnInit(): void {
    console.log("TicketComponent -> ngOnInit -> this.activatedRoute", this.activatedRoute.queryParams)
    this.sub = this.activatedRoute.queryParams
       .subscribe(params => {

         this.id = params.ticketId ? params.ticketId : null; 
         console.log('The id of this route is: ', this.id);     
    });
  }

  save() {
    console.log('Save()');     
  }

  ngOnDestroy() {
    this.sub && this.sub.unsubscribe();
  }
}