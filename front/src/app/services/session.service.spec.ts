import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the current login status as an observable', (done) => {
    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
      done();
    });
  });

  it('should emit true when logging in', (done) => {
    service.logIn({
      token: 'fakeToken',
      type: 'Test',
      id: 1,
      username: 'user@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
    });

    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      done();
    });
  });

  it('should emit false when logging out', (done) => {
    service.logIn({
      token: 'fakeToken',
      type: 'Test',
      id: 1,
      username: 'user@test.com',
      firstName: 'Test',
      lastName: 'User',
      admin: false,
    });
    service.logOut();

    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
      done();
    });
  });
});
