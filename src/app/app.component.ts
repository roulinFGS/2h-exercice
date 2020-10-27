import { Component, OnInit } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';

import { Ticket } from '../interfaces/ticket.interface';
import { User } from '../interfaces/user.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {}
}
