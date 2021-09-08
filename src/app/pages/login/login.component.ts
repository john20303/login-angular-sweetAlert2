import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../models/user.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  user: any = '';

  constructor(private _auth: AuthService, private router: Router, private fb: FormBuilder) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      password: ['', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$')]],
    })
  }

  ngOnInit() {
  }
  get email(){
    return this.login.get('email')?.invalid && this.login.get('email')?.touched;
  }
  get password(){
    return this.login.get('password')?.invalid && this.login.get('password')?.touched;
  }

  dataLogin(form: UserModel) {
    if(this.login.invalid){return;}
    this._auth.signInWithPassword(form).subscribe(res => {
      this.user = res;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `You had logged in successfully!`,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(["/home"]);
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: `${err.error.error.message}`,
        text: 'Please check your data!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
  }
}
