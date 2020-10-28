import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component } from '@angular/core';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    const mockRouter = jasmine.createSpyObj(['navigate']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{ provide: Router, useValue: mockRouter }],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
    });

    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
