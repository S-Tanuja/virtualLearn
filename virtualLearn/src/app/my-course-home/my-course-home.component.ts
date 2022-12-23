import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-my-course-home',
  templateUrl: './my-course-home.component.html',
  styleUrls: ['./my-course-home.component.css']
})
export class MyCourseHomeComponent implements OnInit {
  ongoing:any;
  completed:any;
  highlightOngoing=false;
  highlightCompleted=false;
  constructor(private service:LoginServiceService,private router:Router) { }
active="active";
  ngOnInit(): void {
    // this.ongoingCourse();
    
  }
  activeFunction(){
    
  }
 ongoingCourse(){
  this.highlightOngoing=true;
  this.highlightCompleted=false;
  console.log(this.highlightOngoing);
  
    this.service.ongoingCourse().subscribe(data=>{
      console.log(data);
      this.ongoing=JSON.parse(data);
      console.log(this.ongoing);
     
    })
  }
  completedCourse(){
    this.highlightCompleted=true;
    this.highlightOngoing=false;
    this.service.completedCourse().subscribe(data=>{
      console.log(data);
      this.completed=JSON.parse(data);
      console.log(this.completed); 
    },
    (error)=>{
      alert("No Completed Courses");
    })
  }

  openCourse(data:any){
    console.log(data);
    sessionStorage.setItem('courseId',data)
    this.service.openCourse().subscribe(data1=>{
      console.log(data1);
      
      this.router.navigate(['/courseOverview']);
    })
  }
}
