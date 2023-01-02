import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-submit',
  templateUrl: './confirm-submit.component.html',
  styleUrls: ['./confirm-submit.component.css']
})
export class ConfirmSubmitComponent implements OnInit {
  remTime: any;
  counter: any;
  pause: any;;
  chose:any;
  notchose:any;
  constructor(private service : LoginServiceService,private router:Router, public dialogRef: MatDialogRef<ConfirmSubmitComponent>,) { }

  ngOnInit(): void {
    this.remTime= JSON.parse(sessionStorage.getItem('timer')as any);
 console.log(this.remTime)
  }
 submitTest(){
  this.chose=true;
  this.notchose=false
  let answers=JSON.parse(sessionStorage.getItem('answers')as any);
    this.service.submit().subscribe({
      next:(data)=>{
        let show=JSON.parse(data)
      alert(show.message);
      if(show.message=="You have already passed this test"){
        this.router.navigate(['/congratulations']);
      }else{
        alert('Test failed')
        this.router.navigate(['/courseOverview']);
      }
      },
      error:(e)=>{
      }
      
    })
    this.dialogRef.close({data :  'done'})
    
  }


 
 
}
