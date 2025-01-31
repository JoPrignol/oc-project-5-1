import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeacherService } from '../../../../services/teacher.service';
import { SessionService } from '../../../../services/session.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiServiceMock: jest.Mocked<SessionApiService>;
  let routerMock: jest.Mocked<Router>;
  let sessionServiceMock: jest.Mocked<SessionService>;

  beforeEach(() => {
    sessionApiServiceMock = {
      detail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as any;

    routerMock = {
      navigate: jest.fn(),
      url: '/sessions/update/1',
    } as any;

    sessionServiceMock = {
      sessionInformation: { admin: true },
    } as any;

    // Simulation de ActivatedRoute
    const activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1'),
        }
      }
    };

    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        MatSnackBarModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        FormBuilder,
        MatSnackBar,
        TeacherService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
  });

  it('should call initForm with session data when updating a session', () => {
    const mockSession = {
      id: 1,
      name: 'Session 1',
      date: new Date(),
      teacher_id: 1,
      description: 'Session description',
      users: [],
    };

    // Simulation de l'appel à `sessionApiService.detail`
    sessionApiServiceMock.detail.mockReturnValue(of(mockSession));

    // Appel de ngOnInit qui va déclencher l'appel à sessionApiService.detail()
    component.ngOnInit();

    // Vérifier que la méthode initForm a bien été appelée avec les bonnes données
    expect(component.sessionForm?.value).toEqual({
      name: mockSession.name,
      date: new Date(mockSession.date).toISOString().split('T')[0],
      teacher_id: mockSession.teacher_id,
      description: mockSession.description,
    });
  });
});
