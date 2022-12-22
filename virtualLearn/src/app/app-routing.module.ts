import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseChaptersComponent } from './course-chapters/course-chapters.component';
import { CourseCompletedComponent } from './course-completed/course-completed.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { LoginComponent } from './login/login.component';
import { MyCourseHomeComponent } from './my-course-home/my-course-home.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'courseOverview',component:CourseOverviewComponent},
  {path:'courseChapters',component:CourseChaptersComponent},
  {path:'courseCompleted',component:CourseCompletedComponent},
  {path:'myCourse',component:MyCourseHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
