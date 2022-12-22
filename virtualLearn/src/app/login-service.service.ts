import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  courseId:any;
  constructor(private http:HttpClient) { }
  getCourseId(){
    this.courseId=sessionStorage.getItem('courseId');
  }
  logIn(body: any) {

    return this.http.put(environment.url + '/login', body, { observe: 'response' })

}
ongoingCourse(){
  return this.http.get(environment.url + '/user/ongoingCourses',{ responseType:'text' })
}
completedCourse(){
  return this.http.get(environment.url + '/user/completedCourses',{ responseType:'text' })
}
openCourse(){
  this.getCourseId();
  console.log(this.courseId);
  
  return this.http.get(environment.url + `/user/courseOverView?courseId=${this.courseId}`,{ responseType:'text' })
}
}

