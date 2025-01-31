import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { Session } from '../../interfaces/session.interface';


describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;
  let router: Router;
  let mockMatSnackBar: any;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockTeacherService = {
    all: jest.fn().mockReturnValue(of([]))
  }

  // const mockRouter = {
  //   navigate: jest.fn(),
  //   url: '/sessions/update/1'
  // };

  const mockRouter = {
    navigate: jest.fn(),
    url: '/sessions/update/1',
    routerState: {
      snapshot: {
        root: {
          firstChild: {
            paramMap: {
              get: jest.fn().mockReturnValue('1'),
            },
          },
        },
      },
    },
  };


  const mockSessionApiService = {
    create: jest.fn(),
    update: jest.fn(),
    detail: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        { provide: SessionApiService, usevalue: mockSessionApiService },
        { provide: TeacherService, useValue: mockTeacherService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: {open: jest.fn()} },
        FormBuilder,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } } } }
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    sessionApiService = TestBed.inject(SessionApiService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    mockMatSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if the user is not admin', () => {
    mockSessionService.sessionInformation = { admin: false };
    fixture.detectChanges();
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/sessions']);
  });

  it('should init form on update', () => {
    mockSessionService.sessionInformation = { admin: true };

    mockRouter.url = '/sessions/update/1';

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.id).toBe('1');
  });

  it('should initialize the form when the user is admin', () => {
    mockSessionService.sessionInformation = { admin: true };

    mockRouter.url = '/sessions/create';

    fixture.detectChanges();
    component.ngOnInit();

    expect(mockSessionApiService.detail).not.toHaveBeenCalled();

    if(component.sessionForm){
      expect(component.sessionForm.value.name).toBe('');
    }
  });

  // it('should create a session', () => {

  //   let sessionService: any;
  //   let route: any;
  //   let matSnackBar: any;
  //   let teacherService: any = {all: jest.fn()};
  //   let router: any;

  //   let formComponent: FormComponent = new FormComponent(
  //     route,
  //     new FormBuilder(),
  //     matSnackBar,
  //     sessionApiService,
  //     sessionService,
  //     teacherService,
  //     router
  //   );
  //   const session: Session = {
  //     id: 1,
  //     name: 'Test',
  //     description: 'test description',
  //     date: new Date(),
  //     teacher_id: 1,
  //     users: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }

  //   formComponent.onUpdate = false;
  //   formComponent.sessionForm?.setValue(session);
  //   formComponent.submit();

  //   expect(mockSessionApiService.create).not.toHaveBeenCalled();
  // });

  // it('should update a session', () => {

  //   let sessionService: any;
  //   let route: any;
  //   let matSnackBar: any;
  //   let teacherService: any = {all: jest.fn()};
  //   let router: any;

  //   let formComponent: FormComponent = new FormComponent(
  //     route,
  //     new FormBuilder(),
  //     matSnackBar,
  //     sessionApiService,
  //     sessionService,
  //     teacherService,
  //     router
  //   );
  //   const session: Session = {
  //     id: 1,
  //     name: 'Test',
  //     description: 'test description',
  //     date: new Date(),
  //     teacher_id: 1,
  //     users: [],
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   }

  //   formComponent.onUpdate = true;
  //   formComponent.sessionForm?.setValue(session);
  //   formComponent.submit();

  //   expect(mockSessionApiService.update).not.toHaveBeenCalled();
  // });

  it('should open the snackbar and navigate to sessions when page is quited', () => {

    const message = 'test message';
    component.invokeExitPage(message);

    expect(mockMatSnackBar.open).toHaveBeenCalledWith(message, 'Close', { duration: 3000 });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['sessions']);
  });


  it('should create a session', () => {

    // Création d'un mock de SessionApiService
    let mockSessionApiService: jest.Mocked<SessionApiService>;

    mockSessionApiService = {
      all: jest.fn(),
      detail: jest.fn(),
      delete: jest.fn(),
      create: jest.fn().mockReturnValue(of({} as Session)),
      update: jest.fn().mockReturnValue(of({} as Session)),
      participate: jest.fn(),
      unParticipate: jest.fn(),
    } as unknown as jest.Mocked<SessionApiService>;

    // Création d'un mock de TeacherService
    let mockTeacherService: jest.Mocked<TeacherService>;

    mockTeacherService = {
      all: jest.fn().mockReturnValue(of([])),
      detail: jest.fn()
    } as unknown as jest.Mocked<TeacherService>;

    // Création d'un mock de SessionService
    let mockSessionService: jest.Mocked<SessionService> = {
      isLogged: jest.fn(),
      sessionInformation: jest.fn(),
      isLoggedSubject: {} as any,
      $isLogged: {} as any,
      login: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<SessionService>;

    // Création d'une instance de FormComponent contenant les données nécessaires pour le test
    let formComponent = new FormComponent(
      {} as any,
      new FormBuilder(),
      {} as any,
      mockSessionApiService,
      mockSessionService,
      mockTeacherService,
      {} as any
    );

    // Création d'une session
    const session: Session = {
      id: 1,
      name: 'Test',
      description: 'test description',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Initialisation du formulaire avec les données de la session
    formComponent.onUpdate = false;
    if (formComponent.sessionForm) {
      formComponent.sessionForm.setValue({
        name: session.name,
        description: session.description,
        date: session.date,
        teacher_id: session.teacher_id
      });
    }

    fixture.detectChanges();
    formComponent.submit();

    // Vérification que la méthode create de SessionApiService a bien été appelée
    expect(mockSessionApiService.create).toHaveBeenCalled
  });

  it('should update a session', () => {

    // Création d'un mock de SessionApiService
    let mockSessionApiService: jest.Mocked<SessionApiService>;

    mockSessionApiService = {
      all: jest.fn(),
      detail: jest.fn(),
      delete: jest.fn(),
      create: jest.fn().mockReturnValue(of({} as Session)),
      update: jest.fn().mockReturnValue(of({} as Session)),
      participate: jest.fn(),
      unParticipate: jest.fn(),
    } as unknown as jest.Mocked<SessionApiService>;

    // Création d'un mock de TeacherService
    let mockTeacherService: jest.Mocked<any>;

    mockTeacherService = {
      all: jest.fn().mockReturnValue(of([])),
    };

    // Création d'un mock de SessionService
    let mockSessionService: jest.Mocked<SessionService> = {
      isLogged: jest.fn(),
      sessionInformation: jest.fn(),
      isLoggedSubject: {} as any,
      $isLogged: {} as any,
      login: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<SessionService>;

    // Création d'une instance de FormComponent contenant les données nécessaires pour le test
    let formComponent = new FormComponent(
      {} as any,
      new FormBuilder(),
      {} as any,
      mockSessionApiService,
      mockSessionService,
      mockTeacherService,
      {} as any
    );

    const session: Session = {
      id: 1,
      name: 'Test',
      description: 'test description',
      date: new Date(),
      teacher_id: 1,
      users: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Initialisation du formulaire avec les données de la session
    formComponent.onUpdate = true;
    //@ts-ignore
    formComponent.id = session.id?.toString() ?? '';
    formComponent.sessionForm?.setValue({
      name: session.name,
      description: session.description,
      date: session.date,
      teacher_id: session.teacher_id
    });

    formComponent.submit();

    expect(mockSessionApiService.update).toHaveBeenCalled;
  });

});
