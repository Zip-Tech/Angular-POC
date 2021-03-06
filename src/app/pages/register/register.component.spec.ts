import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularMaterialModule,
      ],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getUserDoc$: () => of('users'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`form should be invalid`, async() => {
    component.signupForm.controls['username'].setValue('');
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['password'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it(`form should be valid`, async() => {
    component.signupForm.controls['username'].setValue('abc1234');
    component.signupForm.controls['email'].setValue('asd@asd.com');
    component.signupForm.controls['password'].setValue('@Abc123456');
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('username should be abc1234', () => {
    component.signupForm.controls['username'].setValue('abc1234');
    expect(component.username?.value).toBe('abc1234');
   });

  it('email should be asd@asd.com', () => {
    component.signupForm.controls['email'].setValue('asd@asd.com');
    expect(component.email?.value).toBe('asd@asd.com');
   });

  it('password should be @Abc123456', () => {
    component.signupForm.controls['password'].setValue('@Abc123456');
    expect(component.password?.value).toBe('@Abc123456');
   });

   it(`should call the onSubmit method`, async () => {
    spyOn(component, 'onSubmit');

    component.signupForm.controls['username'].setValue('abc1234');
    component.signupForm.controls['email'].setValue('asd@asd.com');
    component.signupForm.controls['password'].setValue('@Abc123456');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#signup-form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });
});
