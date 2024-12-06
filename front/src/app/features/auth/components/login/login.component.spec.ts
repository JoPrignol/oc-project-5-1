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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from "rxjs";

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

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockSessionService = {
    logIn: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

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
        { provide: AuthService, useValue: mockAuthService },
        { provide: SessionService, useValue: mockSessionService },
        { provide: Router, useValue: mockRouter }
      ],
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionService);
    router = TestBed.inject(Router);

    fixture.detectChanges();

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
    jest.spyOn(authService, 'login').mockReturnValue(of({ admin: true, id: 1 } as SessionInformation));

    component.form.setValue(loginRequest);
    component.submit();

    expect(authService.login).toHaveBeenCalledWith(loginRequest);
    expect(sessionService.logIn).toHaveBeenCalledWith(sessionInformation);
    expect(router.navigate).toHaveBeenCalledWith(['/sessions']);
  });

  it('should set onError to true when password field is not filled', () => {
    const loginRequest = {
      email: 'test@test.com',
      password: null,
    }

    const mockError = { message: 'Invalid credentials' };
    jest.spyOn(authService, 'login').mockReturnValue(throwError(() => mockError));

    component.form.setValue(loginRequest);
    component.submit();

    expect(authService.login).toHaveBeenCalledWith(loginRequest);
    expect(component.onError).toBe(true);
  });
});
