import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { LoginCredential } from '../types';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    formBuilder: FormBuilder
  ) { 
    this.loginFormGroup = formBuilder.group({
      email: ["", [Validators.required]], 
      password: ["", [Validators.required]]
    });
  }

  ngOnInit() {
  }

  login(){
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this.loginService.login(loginCredentials)
    .then((authData) => {
      this.router.navigate(["/tabs"]);
      console.log(authData);
    })
    .catch((authError) => {
      console.log("Auth Error =>", authError)
    })
  }

}
