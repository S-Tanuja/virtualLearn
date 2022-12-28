import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private service: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.courseOverview();
  }
  courseOverview() {
    this.content1 = true;
    this.content2 = false;
    this.showOverview = true;
    this.showChapters = false;
    this.service.openCourse().subscribe(data => {
      // console.log(data);
      this.courseOV = JSON.parse(data);
      console.log(this.courseOV);
      
      this.courseOvDetails = this.courseOV.courseOverview.overViewId;
      // console.log(this.courseOvDetails);
      this.totalChap = JSON.parse(sessionStorage.getItem('totalChap') as any);
      this.totalLessons = JSON.parse(sessionStorage.getItem('totalLessons') as any);
      this.videoLink=this.courseOvDetails.previewThisCourse.videoLink
      // console.log(this.courseOvDetails.previewThisCourse.videoLink);



      //  this.learning= this.courseOV.learningOutCome;
      //  console.log(this.learning);
    })
  }
  courseChapters() {
    this.content1 = false;
    this.content2 = true;
    this.showOverview = false;
    this.showChapters = true;
    this.service.courseChapters().subscribe(data => {
      console.log(data);
      this.courseChap = JSON.parse(data);
      console.log(this.courseChap);
      this.chaptersList = this.courseChap.listOfChapters.totalChapters[0].chapters;
      sessionStorage.setItem('totalChap', JSON.stringify(this.courseChap.listOfChapters.courseContent.totalChapters));
      sessionStorage.setItem('totalLessons', JSON.stringify(this.courseChap.listOfChapters.courseContent.totalLessons));
      // alert(this.courseChap.listOfChapters.totalChapters[0]._id)
      console.log(this.courseChap.listOfChapters.totalChapters[0].test.testTitle);

      sessionStorage.setItem('testName', JSON.stringify(this.courseChap.listOfChapters.totalChapters[0].testTitle));

      this.chaptersList.dropdown = false;
      sessionStorage.setItem('getChaptersList', JSON.stringify(this.chaptersList))
      this.lessons = this.chaptersList.test;
      console.log(this.lessons);

      // console.log(this.chaptersList.chapterNumber);


      // sessionStorage.setItem('chapName',JSON.stringify(this.chaptersList.chapterName));

      // console.log(this.lessons);

      // this.tests=this.courseChap.listOfChapters.totalChapters[1].test.testNumber;
      // console.log(this.tests);
    })
  }

  displayDropdown(chapterDesc: any) {
    chapterDesc.dropdown = !chapterDesc.dropdown;
    console.log(chapterDesc);
    sessionStorage.setItem('chapNo', JSON.stringify(chapterDesc.chapterNumber));
    sessionStorage.setItem('chapName', JSON.stringify(chapterDesc.chapterTitle));
    sessionStorage.setItem('chapId', JSON.stringify(this.courseChap.listOfChapters.totalChapters[0]._id));
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


      //  sessionStorage.setItem('courseDetails',JSON.stringify(allData));
    }
  }

  moduleTest(testId: any) {
    console.log(testId);
    // console.log(this.chaptersList.chapterName);

    // sessionStorage.getItem(JSON.parse('chapName'));
    console.log();


    sessionStorage.setItem('testId', testId);
    let status=sessionStorage.getItem('sstatus');
    alert(status)
    if ( status== "You have already passed this test") {
      if (confirm("View result?")) {
        this.router.navigate(['progressScreen']);
      }
    } else{
      this.router.navigate(['moduleTests']);
    }
  }
  //   else
  //  
  //  }
  playVideo(lessonUrl:any){
    this.videoLink=lessonUrl;
  }

}
