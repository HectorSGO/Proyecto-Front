import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router, } from '@angular/router';
import { response } from 'express';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'digidex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent {
  formGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {    
  }
  //uso del servicio.
  onSubmit() {
    if (this.formGroup.valid) {
      let cred = this.formGroup.value
      this.authService.login( {
        email: cred.username as string,
        password: cred.password as string,
      }).subscribe(response => this.router.navigateByUrl('/home'))
      
    }
  }

  get username() {
    return this.formGroup.controls.username
  }

  get password() {
    return this.formGroup.controls.password
  }

}