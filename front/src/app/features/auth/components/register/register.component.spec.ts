import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router

  const mockAuthService = {
    register: jest.fn(),
  };

  const mockRouter = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create an account when the form is submitted', () => {
    const registerRequest = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test'
    }

    jest.spyOn(mockAuthService, 'register').mockReturnValue(of(undefined));

    component.form.setValue(registerRequest);
    component.submit();

    expect(authService.register).toHaveBeenCalledWith(registerRequest);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should throw an error if at least one of the fields is missing or invalid', () => {
    const registerRequest = {
      firstName: 't',
      lastName: 'test',
      email: '',
      password: 'test'
    }

    jest.spyOn(mockAuthService, 'register').mockReturnValue(of(undefined));

    component.form.setValue(registerRequest);

    expect(component.form.invalid).toBe(true);

    component.submit();

    if(component.form.invalid) {
      component.onError = true
    }

    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector('.error');
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent).toContain('An error occurred');
  });
});
