import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  inputForm!:FormGroup;
  constructor(private service: LoginServiceService, private fb: FormBuilder, private router: Router) { }



  ngOnInit(): void {



    this.inputForm = this.fb.group({

      name: this.fb.control(null, [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]),

      password: this.fb.control(null, [Validators.required])

    })
  }
  onEnter(event: any,password:any){
    if(event.keyCode == 13){
     this.onSubmit();
    }
  }
  onSubmit(){

    const body = {
      'userName': this.inputForm.value.name,
      'password': this.inputForm.value.password
    }

    if(this.inputForm.invalid){
      alert("Please fill all the required form");
    }else{
    this.service.logIn(body).subscribe({
      next: (data) => {
        console.log(data);
        let token: any = data.headers.get('jwt-token');
        sessionStorage.setItem('token', token);
        // alert(data)
      },
      error: (e) => {
        alert(e.error)
      },
      complete: () => {
        alert('Login successfull');
        if(sessionStorage.getItem('token')){
        this.router.navigate(['/myCourse'])
        }else{
          alert('Invalid Credentials')
        }
      }
    })

  }

  }

}
