import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../models/user.model";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  login: FormGroup;
  user: any;


  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]],
      nombre: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.pattern('(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,16}$')]],
    })
  }

  ngOnInit() { }

  get email(){
    return this.login.get('email')?.invalid && this.login.get('email')?.touched;
  }
  get nombre(){
    return this.login.get('nombre')?.invalid && this.login.get('nombre')?.touched;
  }
  get password(){
    return this.login.get('password')?.invalid && this.login.get('password')?.touched;
  }


  dataLogin(form: UserModel) {
    if (this.login.invalid){return;}
    console.log(form)
    this._auth.signupNewUser(form).subscribe(res => {
      this.user = res;
      console.log(this.user);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `The user ${this.user.email} has been created successfully!`,
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/login']);
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
