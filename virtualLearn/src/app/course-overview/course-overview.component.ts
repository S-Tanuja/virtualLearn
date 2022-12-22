import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  courseOV:any;
  constructor(private service : LoginServiceService) { }

  ngOnInit(): void {
    this.courseOverview();
  }
courseOverview(){
  this.service.openCourse().subscribe(data=>{
    console.log(data);
    this.courseOV=JSON.parse(data)
    console.log(this.courseOV);
   let learning= this.courseOV.learningOutcome;
   console.log(learning);
   
    
  })
}
}
