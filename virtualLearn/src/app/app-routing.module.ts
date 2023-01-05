import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { CourseChaptersComponent } from './course-chapters/course-chapters.component';
import { CourseCompletedComponent } from './course-completed/course-completed.component';
import { CourseOverviewComponent } from './course-overview/course-overview.component';
import { LoginComponent } from './login/login.component';
import { ModuleTestComponent } from './module-test/module-test.component';
import { MyCourseHomeComponent } from './my-course-home/my-course-home.component';
import { ProgressScreenComponent } from './progress-screen/progress-screen.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'courseOverview',component:CourseOverviewComponent},
  {path:'courseChapters',component:CourseChaptersComponent},
  {path:'courseCompleted',component:CourseCompletedComponent},
  {path:'myCourse',component:MyCourseHomeComponent},
  {path:'moduleTests',component:ModuleTestComponent},
  {path:'congratulations',component:CongratulationsComponent},
  {path:'progressScreen',component:ProgressScreenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
