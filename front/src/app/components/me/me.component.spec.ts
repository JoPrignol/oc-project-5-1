import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';

import { MeComponent } from './me.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('MeComponent', () => {
  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    },
    logOut: jest.fn()
  }

  const mockUserService = {
    getById: jest.fn().mockReturnValue(of({
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
    delete: jest.fn().mockReturnValue(of(null))
  };

  const mockMatSnackBar = {
    open: jest.fn()
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: UserService, useValue: mockUserService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: Router, useValue: mockRouter }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user informations', () => {
    expect(mockUserService.getById).toHaveBeenCalledWith('1');

    const userName = fixture.debugElement.query(By.css('[data-testid="user-name"]')).nativeElement;
    expect(userName.textContent).toContain('Name: Test USER');

    const userEmail = fixture.debugElement.query(By.css('[data-testid="user-email"]')).nativeElement;
    expect(userEmail.textContent).toContain('test@test.com');

    const userAdmin = fixture.debugElement.query(By.css('[data-testid="user-isAdmin"]')).nativeElement;
    expect(userAdmin.textContent).toContain('You are admin');
  });

  it('should call delete function when delete button is clicked, then show the snackbar, logout and redirect', fakeAsync(() => {
    component.delete();

    tick();

    expect(mockUserService.delete).toHaveBeenCalledWith('1');

    expect(mockMatSnackBar.open).toHaveBeenCalledWith("Your account has been deleted !", 'Close', { duration: 3000 });

    expect(mockSessionService.logOut).toHaveBeenCalled();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  }));
});
