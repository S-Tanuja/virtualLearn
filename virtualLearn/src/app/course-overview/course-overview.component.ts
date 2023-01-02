import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { ContinueWatchingComponent } from '../continue-watching/continue-watching.component';
import { LoginServiceService } from '../login-service.service';
import { ModuleTestComponent } from '../module-test/module-test.component';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {
  courseOV: any;
  learning: any;
  content1 = false;
  content2 = false;
  showChapters = false;
  showOverview = true;
  courseOvDetails: any;
  courseChap: any;
  chaptersList: any;
  lessons: any;
  tests: any;
  icon = 'add';
  totalChap: any;
  totalLessons: any;
  videoLink: any;
  testMessage: any;
  vidStatus="false";
  videoStatus=false;
  vidIndex:any;
  videoDetails:any;
  testPassed:any;
  ongoingSerNum=0;
  serialNumber:any;
  currentTime: any;
  pausedTime:any;
  count=1;
  showdiv1:any;
  title:any;
  show=false;
  showoc:any;
  dd:any;
  curtime:any;

  video:any;
  playButton:any;
  muteButton:any;
  seekBar:any;
  fullScreenButton:any;
  volumeBar:any;
  constructor(private service: LoginServiceService, private router: Router,private dialog:MatDialog) { }

  ngOnInit(): void {
    
    this.courseOverview();
    this.courseChapters();
    this.videoCompleted();
    this.dd=sessionStorage.getItem('dd')
    // this.showoc = sessionStorage.getItem('oc');
   
    this.showdiv1=sessionStorage.getItem('div1')
   this.title= sessionStorage.getItem('title')
    // this.completedLessonVideo();
  }
  courseOverview() {
    sessionStorage.setItem('ov','overview');
    this.showoc = sessionStorage.getItem('ov');

    this.show=false;
    this.content1 = true;
    this.content2 = false;
    this.showOverview = true;
    this.showChapters = false;
    this.service.openCourse().subscribe(data => {
      // console.log(data);
      this.courseOV = JSON.parse(data);
      console.log(this.courseOV);
      // sessionStorage.setItem('ongoingSerImp',this.courseOV.ongoingSerialNumber)
      this.courseOvDetails = this.courseOV.courseOverview.overViewId;
      // console.log(this.courseOvDetails);
      this.totalChap = JSON.parse(sessionStorage.getItem('totalChap') as any);
      this.totalLessons = JSON.parse(sessionStorage.getItem('totalLessons') as any);
      this.videoLink = this.courseOvDetails.previewThisCourse.videoLink
  
    })
  }
  courseChapters() {
    sessionStorage.setItem('oc','chapters');
    this.showoc = sessionStorage.getItem('oc');
    
    this.show=true;
    this.content1 = false;
    this.content2 = true;
    this.showOverview = false;
    this.showChapters = true;
    this.service.courseChapters().subscribe(data => {
     
      console.log(data);
      this.courseChap = JSON.parse(data);
      console.log(this.courseChap);
      this.chaptersList = this.courseChap.listOfChapters.totalChapters[0].chapters;
      this.chaptersList.dropdown =false;
      sessionStorage.setItem('totalChap', JSON.stringify(this.courseChap.listOfChapters.courseContent.totalChapters));
      sessionStorage.setItem('totalLessons', JSON.stringify(this.courseChap.listOfChapters.courseContent.totalLessons));
      // alert(this.courseChap.listOfChapters.totalChapters[0]._id)
      console.log(this.courseChap.listOfChapters.totalChapters[0].test.testTitle);

      sessionStorage.setItem('testName', JSON.stringify(this.courseChap.listOfChapters.totalChapters[0].testTitle));
      
      
      sessionStorage.setItem('getChaptersList', JSON.stringify(this.chaptersList))
      this.lessons = this.chaptersList.test;
      console.log(this.lessons);
    })
  }

  displayDropdown(chapterDesc: any) {
    chapterDesc.dropdown = !chapterDesc.dropdown;
    sessionStorage.setItem('dd',chapterDesc.dropdown);
    console.log(chapterDesc);
    sessionStorage.setItem('chapNo', JSON.stringify(chapterDesc.chapterNumber));
    sessionStorage.setItem('chapName', JSON.stringify(chapterDesc.chapterTitle));
    sessionStorage.setItem('chapId', JSON.stringify(this.courseChap.listOfChapters.totalChapters[0]._id));
    // sessionStorage.setItem('lessNo',JSON.stringify());
    //  console.log(chapterDesc.dropdown);

    //  console.log(chapterDesc.chapterNumber);

    let allData = JSON.parse(sessionStorage.getItem('getChaptersList') as any);
    let object = allData.find((eachObject: any) => {


      let chapId = eachObject.chapterNumber == chapterDesc.chapterNumber;

      return chapId;
    });
    if (object != undefined) {
      let index = allData.indexOf(object);
      allData[index] = chapterDesc;
    
    }
   
  }

  moduleTest(testId: any) {
    console.log(testId);
    console.log();
    sessionStorage.setItem('testId', testId);
  }
  
  playVideo(lessonUrl: any, lessonNum: any, lessonDur:any,videoidx:any) {
    this.serialNumber=lessonNum;
    this.vidStatus="false";
    sessionStorage.setItem('vidStatus',this.vidStatus)
    // console.log(this.vidStatus);
    
    this.vidIndex=videoidx;
    sessionStorage.setItem('lessNo', (lessonNum))
    sessionStorage.setItem('lessdur', (lessonDur))
    this.videoLink = lessonUrl;
  }
  testStatus1(testId1: any) {
    sessionStorage.setItem('testId', testId1);
    this.service.testStatus().subscribe({

      next: data => {
        console.log(data);
        let stat = JSON.parse(data);
        this.testMessage = stat.message;


      }, complete: () => {
        console.log(this.testMessage);
        if (this.testMessage == "true") {
          if (confirm("You have already passed this test.\n View Result?"))
            this.router.navigate(['progressScreen']);
        } else {
          this.router.navigate(['moduleTests']);
        }
      }
    })
  }

  updateUserProgress(){
    var video = document.getElementById("video") as any;
    console.log(video.paused);
      this.curtime = video.currentTime;
      console.log(this.curtime);
      sessionStorage.setItem('pausedTime',JSON.stringify(this.curtime))
    this.userProgress();
    console.log(this.vidStatus);
    // if(this.count%2==0){
    // this.continueWatching();
    // }
    // this.count++;
  }
videoCompleted(){
  this.vidStatus="true";
  console.log( this.vidStatus);

  sessionStorage.setItem('vidStatus',this.vidStatus)
  // this.updateUserProgress();
 this.userProgress();

  this.service.videoComplete().subscribe(data=>{
    // console.log(data);
   this.videoDetails=JSON.parse(data);
    console.log(this.videoDetails); 
    this.ongoingSerNum=this.videoDetails.ongoingSerialNumber;
    this.testPassed=this.videoDetails.testsPassed;
    console.log( this.ongoingSerNum);
  })
}
userProgress(){
  this.service.userProgress().subscribe(data=>{
    console.log(data);
    var video = document.getElementById("video") as any;
    var curtime = video.currentTime;
      console.log(curtime);
      sessionStorage.setItem('pauseddTime',JSON.stringify(curtime))
    let message=JSON.parse(data);
    console.log(message.message);
    if(message.message==="Lesson completed"){
      this.videoStatus=true;
      console.log(this.videoStatus);
      this.service.videoComplete().subscribe(data=>{
        // console.log(data);
       this.videoDetails=JSON.parse(data);
        console.log(this.videoDetails); 
        this.ongoingSerNum=this.videoDetails.ongoingSerialNumber;
        this.testPassed=this.videoDetails.testsPassed;
        console.log( this.ongoingSerNum);
      })
  //  this.continueWatching();
      
    }
    
    
  })
}
  completedLessonVideo(){
   
        this.service.videoData().subscribe(data=>{
        //  let mess=data.watchedTime;
        let datas = JSON.parse(data)
          console.log(datas.watchedTime);
          sessionStorage.setItem('watchedTime',datas.watchedTime)
          // alert(message);
          this.pausedTime= sessionStorage.getItem('watchedTime');

          // if(this.pausedTime>0)
          // this.continueWatching();    
        })
  }
  continueWatching(){
    this.dialog.open(ContinueWatchingComponent, { height: '25%', width: '30%',panelClass:'custom'});
  }
  seekTime(data:any){

  }

}





