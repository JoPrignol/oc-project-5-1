import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { User } from '../interfaces/user.interface';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifier qu'aucune requête n'est en attente
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user by ID', () => {
    const mockUser: User = {
      id: 2,
      email: 'test123@123test.com',
      lastName: 'Test',
      firstName: 'User',
      admin: false,
      password: 'testPassword123!',
      createdAt: new Date(),
    };

    service.getById('2').subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${service['pathService']}/2`);
    expect(req.request.method).toBe('GET');

    req.flush(mockUser);
  });

  it('should delete a user by ID', () => {
    service.delete('2').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['pathService']}/2`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });
});
