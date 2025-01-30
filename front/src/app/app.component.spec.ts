// import { HttpClientModule } from '@angular/common/http';
// import { TestBed } from '@angular/core/testing';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { RouterTestingModule } from '@angular/router/testing';
// import { expect } from '@jest/globals';

// import { AppComponent } from './app.component';


// describe('AppComponent', () => {
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientModule,
//         MatToolbarModule
//       ],
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   });

//   it('should create the app', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.componentInstance;
//     expect(app).toBeTruthy();
//   });
// });


import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';


import { ComponentFixture } from '@angular/core/testing';
import { SessionService } from './services/session.service';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let sessionService: jest.Mocked<SessionService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const sessionServiceMock = {
      $isLogged: jest.fn(),
      logOut: jest.fn(),
    };
    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: AuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    sessionService = TestBed.inject(SessionService) as jest.Mocked<SessionService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should return true for $isLogged', () => {
    sessionService.$isLogged.mockReturnValue(of(true));

    app.$isLogged().subscribe(isLogged => {
      expect(isLogged).toBe(true);
    });
  });

  it('should call logOut and navigate when logout is called', () => {
    app.logout();

    expect(sessionService.logOut).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
});
