import { DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@firebase/auth/auth.service';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/styles/angular-material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularMaterialModule,
      ],
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should onSubmit call', async () => {
    spyOn(component, 'onSubmit');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it(`form should be invalid`, async () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be valid`, async () => {
    component.loginForm.controls['email'].setValue('asd@asd.com');
    component.loginForm.controls['password'].setValue('@Abc123456');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('email should be asd@asd.com', () => {
    component.loginForm.controls['email'].setValue('asd@asd.com');
    expect(component.email?.value).toBe('asd@asd.com');
  });

  it('password should be @Abc123456', () => {
    component.loginForm.controls['password'].setValue('@Abc123456');
    expect(component.password?.value).toBe('@Abc123456');
  });

   it(`should call the onSubmit method`, async () => {
    spyOn(component, 'onSubmit');

    component.loginForm.controls['email'].setValue('asd@asd.com');
    component.loginForm.controls['password'].setValue('@Abc123456');
    fixture.detectChanges();

    fixture.debugElement.query(By.css('#login-form'))
      .triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
    });
  });
});
