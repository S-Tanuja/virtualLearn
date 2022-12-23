import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  courseOV:any;
  learning:any;
  content1=false;
  content2=false;
  showChapters=false;
  showOverview=true;
  courseOvDetails:any;
  courseChap:any;
  constructor(private service : LoginServiceService) { }

  ngOnInit(): void {
    this.courseOverview();
  }
courseOverview(){
  this.content1=true;
  this.content2=false;
  this.showOverview=true;
  this.showChapters=false;
  this.service.openCourse().subscribe(data=>{
    // console.log(data);
    this.courseOV=JSON.parse(data);
   this.courseOvDetails=this.courseOV.courseOverview.overViewId;
    console.log(this.courseOvDetails);
    // console.log(this.courseOvDetails.previewThisCourse.videoLink);
    

    
  //  this.learning= this.courseOV.learningOutCome;
  //  console.log(this.learning);
  })
}
courseChapters(){
  this.content1=false;
  this.content2=true;
  this.showOverview=false;
  this.showChapters=true;
  this.service.courseChapters().subscribe(data=>{
    console.log(data);
    alert('hi')
    this.courseChap=JSON.parse(data);
    console.log(this.courseChap);
    console.log(this.courseChap.listOfChapters.courseContent.totalChapters);
    
    
    
  })
}
}
