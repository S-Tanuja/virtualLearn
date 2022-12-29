import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {
  courseId:any;
  token:any;
  completeStatus:any;
  constructor(private http:HttpClient) { }
  getToken(){
    this.token = JSON.parse(sessionStorage.getItem('token') as any);
  }
  getCourseId(){
    this.courseId=sessionStorage.getItem('courseId');
  }
  logIn(body: any) {

    return this.http.post(environment.url + 'signIn', body, {responseType:"text"})
    // return this.http.put(environment.url + '/login', body, { observe: 'response' })
}
ongoingCourse(){
  // return this.http.get(environment.url + '/user/ongoingCourses',{ responseType:'text' })
  return this.http.get(environment.url + 'ongoingCourses',{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text' })

}
completedCourse(){
  return this.http.get(environment.url + 'completedCourses',{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token),responseType:'text' })
}
openCourse(){
  this.getCourseId();
  console.log(this.courseId);
 let body={
  "courseId":this.courseId
 }
  return this.http.post(environment.url + `getCourse/overview`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
courseChapters(){
  this.getCourseId();
  let body={
    "view":'chapters',
    "courseId":this.courseId
   }
   return this.http.post(environment.url + `getCourse/chapters`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
courseTests(){
  this.getCourseId();
  let testid=sessionStorage.getItem('testId')
  let body={ 
    "courseId":this.courseId,
    "testId":testid
   }
   return this.http.post(environment.url + `displayTest`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
submit(){
  let details=JSON.parse(sessionStorage.getItem('getChaptersList') as any);
  let testid=sessionStorage.getItem('testId');
 let chapterNumber = JSON.parse(sessionStorage.getItem('chapNo') as any);
     let chapterName = JSON.parse(sessionStorage.getItem('chapName') as any);
     let chapId= JSON.parse(sessionStorage.getItem('chapId') as any);
     let answers=JSON.parse(sessionStorage.getItem('answers')as any);
  let body={ 
    "courseId":this.courseId,
    "testId":testid,
    "chapterNumber" :chapterNumber,
    "chapterTitle":chapterName,
    "chapterId":chapId,
    "answers":answers
   }
   return this.http.post(environment.url + `submitTest`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
testResult(){
 
  let testid=sessionStorage.getItem('testId');
  let body={ 
    "testId":testid,
  }
  return this.http.post(environment.url + `getCompletedTestResultData`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
testStatus(){
  let testid=sessionStorage.getItem('testId');
  console.log(testid);
  
  let body={ 
    "testId":testid,
  }
  return this.http.post(environment.url + `getTestStatus`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
}
userProgress(){
  let lessonNumber=(sessionStorage.getItem('lessNo'));
  let pausedTime=sessionStorage.getItem('pausedTime');
  // console.log(sessionStorage.getItem('pausedTime'));
  
  let lessonDuration=sessionStorage.getItem('lessdur');
 
  if(lessonDuration==pausedTime){
    this.completeStatus=true;
  }else{
    this.completeStatus=false;
  }
  // alert('hi')
  let body={
    "courseId":this.courseId,
    "videoCompleted":this.completeStatus,
    "pauseTime":pausedTime,
    "videoSerialNumber":lessonNumber
  }
  return this.http.post(environment.url + `updateProgress`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
  
}
// videoData(){
//   let lessonNumber=sessionStorage.getItem('lessNo');

//   let body={ 
//     "courseId":this.courseId,
//     "serialNumberOfLesson":lessonNumber
//   }

//   return this.http.post(environment.url + `getVideoData`,body,{ headers:new HttpHeaders().set('Authorization',"Bearer "+ this.token), responseType:'text' })
// }
}


