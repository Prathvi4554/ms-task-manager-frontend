import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CommonService } from '../services/common.service';
import { Auth } from '../../shared/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm!: FormGroup;
  submitted = false;
  PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  constructor(private fb: FormBuilder, private router: Router, private commonService: CommonService, private auth: Auth) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.PASSWORD_REGEX)]]
    });
  }

  get f() {
    return this.loginForm.controls;

  }

  async onSubmit() {
    try {
      this.submitted = true;
      if (this.loginForm.invalid) return;

      console.log(" this.loginForm.value", this.loginForm.value)

      const loginResponse:any = await lastValueFrom(
        this.commonService.login(this.loginForm.value)
      );

     localStorage.setItem('userToken', JSON.stringify({id: loginResponse?._id,is_admin: loginResponse.is_admin? true: false}));

      localStorage.setItem('token', loginResponse.token);

      alert("Login SuccessFull")

      this.router.navigate(['/task-activity']);

    } catch (err) {
      alert('Login Failed')
    }
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }


}
