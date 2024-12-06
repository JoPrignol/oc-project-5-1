import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Session } from '../interfaces/session.interface';

import { SessionApiService } from './session-api.service';

describe('SessionsService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;
  let pathService = 'api/session';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        SessionApiService
      ]
    });
    service = TestBed.inject(SessionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Permet de vérifier si les requêtes HTTP ont bien été appelées
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a session', () => {
    const testSession: Session = {
      id: 1,
      name: 'Test Session',
      description: 'Test description',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    service.create(testSession).subscribe(response => {
      expect(response).toEqual(testSession);
    });

    const req = httpMock.expectOne(`${pathService}`);
    expect(req.request.method).toBe('POST');
    req.flush(testSession);
  });

  it('should participate to a session', () => {
    const userId = '1';
    const sessionId = '1';

    service.participate(sessionId, userId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${pathService}/${sessionId}/participate/${userId}`);
    expect(req.request.method).toBe('POST');

    req.flush(null);
  });

  it('should update a session', () => {
    const updatedTestSession: Session = {
      id: 1,
      name: 'Test Session Updated',
      description: 'Test description updated',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    service.update('1', updatedTestSession).subscribe(response => {
      expect(response).toEqual(updatedTestSession);
    });

    const req = httpMock.expectOne(`${pathService}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTestSession);
    req.flush(updatedTestSession);
  });
});
