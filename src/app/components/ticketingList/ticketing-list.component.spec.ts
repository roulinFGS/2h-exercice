import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackendService } from 'src/app/backend.service';
import { TicketingListComponent } from './ticketing-list.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Ticket } from '../../../interfaces/ticket.interface';

const storedTickets: Ticket[] = [
    {
        id: 0,
        completed: false,
        assigneeId: 111,
        description: 'Install a monitor arm'
    },
    {
        id: 1,
        completed: false,
        assigneeId: 111,
        description: 'Move the desk to the new location'
    }
];

describe('ticketing-list', () => {
    let fixture: ComponentFixture<TicketingListComponent>;
    const mockBackendService = jasmine.createSpyObj(['tickets', 'newTicket']);
    mockBackendService.tickets.and.returnValue(of(storedTickets));
    mockBackendService.newTicket.and.returnValue(of('test'));
    const mockRouter = jasmine.createSpyObj(['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TicketingListComponent],
            providers: [
                { provide: BackendService, useValue: mockBackendService },
                { provide: Router, useValue: mockRouter }
            ],
            imports: [ FormsModule ]
        });

        fixture = TestBed.createComponent(TicketingListComponent);
    });

    // Isolated unit tests
    it('should create the ticket component', () => {
        const component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    });
    it(`should trigger a navigation when users clicks on a ticket`, () => {
        fixture.detectChanges();
        fixture.debugElement.query(By.css('li')).nativeElement.click();
        fixture.detectChanges();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/tickets'], { queryParams: { ticketId: storedTickets[0].id } });
    });

    // Shallow integration tests
    it(`should display a list of tickets when backend service provides a non empty array`, () => {
        fixture.detectChanges();
        const el = fixture.debugElement.query(By.css('li')).nativeElement;
        expect(el).toBeTruthy();
        expect(el.innerHTML).toContain(storedTickets[0].description);
    });
    it(`should call backend service creation when entering a new ticket`, async () => {
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('textarea[name="newTicket"]')).nativeElement;
        expect(el).toBeTruthy();
        const newContent = 'something';
        el.value = newContent;
        fixture.componentInstance.newTicket = 'toto';
        el.dispatchEvent((new KeyboardEvent('keyup', {key: 'enter'})));
        fixture.detectChanges();
        expect(mockBackendService.newTicket).toHaveBeenCalled();
    });
});
