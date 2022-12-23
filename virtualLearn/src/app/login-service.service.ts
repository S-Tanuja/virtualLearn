import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {
  courseId:any;
  token:any;
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
  return this.http.get(environment.url + 'completedCourses',{ responseType:'text' })
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
}


