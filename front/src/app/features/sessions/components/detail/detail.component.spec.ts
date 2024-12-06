import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let service: SessionService;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1,
      name: 'Test Session',
      users: [],
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      description: 'Test description',
      teacher_id: 1
    }
  }

  const mockTeacherService = {
    teacherInformation: {
      id: 1,
      firstName: 'Test',
      lastName: 'Teacher',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [DetailComponent],
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();
      service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    component.session = mockSessionService.sessionInformation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display back button', () => {
    const backButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
    expect(backButton.textContent).toBeTruthy();
  });

  it('should call delete function when delete button is clicked', () => {
    jest.spyOn(component, 'delete');
    const deleteButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
    deleteButton.click();
    expect(component.delete).toHaveBeenCalled();
  });

  it('should display correct session informations', () => {
    const sessionName = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(sessionName.textContent).toContain(component.session?.name);

    const attendees = fixture.debugElement.query(By.css('[data-testid="attendees-count"]')).nativeElement;
    expect(attendees.textContent).toContain('0');

    const date = fixture.debugElement.query(By.css('[data-testid="session-date"]')).nativeElement;

    const expectedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    expect(date.textContent).toContain(expectedDate);

    const description = fixture.debugElement.query(By.css('[data-testid="session-description"]')).nativeElement;
    expect(description.textContent).toContain(component.session?.description);
  });



});
