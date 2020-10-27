import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { AppRoutingModule } from './app-routing.module';
import { TicketingListModule } from './components/ticketingList/ticketing-list.module';
import { TicketModule } from './components/ticket/ticket.module';
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        TicketingListModule
    ],
    providers: [BackendService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
