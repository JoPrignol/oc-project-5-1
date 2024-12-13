import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { first, of } from "rxjs";
import { NgZone } from '@angular/core';

import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Session } from 'src/app/features/sessions/interfaces/session.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let sessionService: SessionService;
  let router: Router;
  let httpMock: HttpTestingController;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        SessionService
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    ngZone = TestBed.inject(NgZone);

    fixture.detectChanges();

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method from AuthService', () => {
    const loginRequest = {
      email: 'test@test.com',
      password: 'password123!',
    }
    const sessionInformation = { admin: true, id: 1 };

    const logInSpy = jest.spyOn(sessionService, 'logIn');
    const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

    component.form.setValue(loginRequest);

    ngZone.run(() => {
      component.submit();
    });

    const req = httpMock.expectOne('api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);

    req.flush(sessionInformation);

    expect(logInSpy).toHaveBeenCalledWith(sessionInformation);
    expect(navigateSpy).toHaveBeenCalledWith(['/sessions']);

    logInSpy.mockRestore();

  });

  it('should set onError to true when password field is not filled', () => {
    const loginRequest = {
      email: 'test@test.com',
      password: null,
    }

    const mockError = { message: 'Invalid credentials' };

    component.form.setValue(loginRequest);

    ngZone.run(() => {
      component.submit();
    });

    const req = httpMock.expectOne('api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(loginRequest);

    req.flush(mockError, { status: 400, statusText: 'Bad Request' });

    expect(component.onError).toBe(true);
  });
});
