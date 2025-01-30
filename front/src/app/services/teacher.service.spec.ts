import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Teacher } from '../interfaces/teacher.interface';

describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [
        TeacherService
      ]
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get teacher by id', (done) => {
    // Arrange : Données mockées
    const mockTeacher: Teacher = {
      id: 1,
      lastName: 'Test',
      firstName: 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const teacherId = '1';

    // Appeler la méthode detail()
    service.detail(teacherId).subscribe((teacher) => {
      expect(teacher).toEqual(mockTeacher);
      done();
    });

    // Simuler une requête HTTP et vérifier son URL
    const req = httpMock.expectOne(`api/teacher/${teacherId}`);
    expect(req.request.method).toBe('GET');

    // Répondre avec des données mockées
    req.flush(mockTeacher);
  });
});
