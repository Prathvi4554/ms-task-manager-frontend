import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService) { }


  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_REGEX)]],
      confirmPassword: ['', Validators.required]
    }, { validators: confirmPasswordValidator });
  }

  get f() {
    return this.signupForm.controls;

  }

  async onSubmit() {
    try {
      if (this.signupForm.invalid) return;

      console.log(" this.signupForm.value", this.signupForm.value)

      const signupQuery = {
        name: this.signupForm.value['name'],
        email: this.signupForm.value['email'],
        password: this.signupForm.value['password']
      }

      await lastValueFrom(
        this.commonService.signup(signupQuery)
      );

      alert("SignUp SuccessFull")

      this.router.navigate(['/login']);

    } catch (err) {
      alert('Signup Failed')
    }
  }
  redirectToLogin() {
    this.router.navigate(['/login']);
  }



}



export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};
