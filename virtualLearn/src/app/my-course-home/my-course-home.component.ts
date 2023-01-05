import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iif } from 'rxjs';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-my-course-home',
  templateUrl: './my-course-home.component.html',
  styleUrls: ['./my-course-home.component.css']
})
export class MyCourseHomeComponent implements OnInit {
 courses:any;
  highlightOngoing=false;
  highlightCompleted=false;
  constructor(private service:LoginServiceService,private router:Router) { }
active="active";
  ngOnInit(): void {
    this.ongoingCourse();
    sessionStorage.removeItem('cl');
    sessionStorage.removeItem('oc');
    sessionStorage.setItem('div1','Ongoing')
    
  }
  activeFunction(){
    
  }
 ongoingCourse(){
  this.highlightOngoing=true;
  this.highlightCompleted=false;
  this.courses=[];
  console.log(this.highlightOngoing);
  
    this.service.ongoingCourse().subscribe(data=>{
      console.log(data);
      this.courses=JSON.parse(data);
      console.log(this.courses);
      
  sessionStorage.setItem('courseName',JSON.stringify(this.courses[0].title))
     
    })
  }
  completedCourse(){
    sessionStorage.setItem('div1','Completed')

    this.highlightCompleted=true;
    this.highlightOngoing=false;
    this.courses=[];
    this.service.completedCourse().subscribe(data=>{
      console.log(data);
      this.courses=JSON.parse(data);
      console.log(this.courses);
    })
 
  }

  openCourse(data:any,data1:any){
    console.log(data);
    sessionStorage.setItem('courseId',data);
    sessionStorage.setItem('title',data1);
   console.log( sessionStorage.getItem('courseId'))
   console.log(data)
  //  if(data!=sessionStorage.getItem('courseId')){
  //   sessionStorage.removeItem('cl');
  //  }

    this.service.openCourse().subscribe(data1=>{
      console.log(data1);
      
      this.router.navigate(['/courseOverview']);
    })
  }
}
