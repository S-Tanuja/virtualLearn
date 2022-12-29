import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginServiceService } from '../login-service.service';
import { LoginComponent } from '../login/login.component';
import { QuizResultComponent } from '../quiz-result/quiz-result.component';
@Component({
  selector: 'app-progress-screen',
  templateUrl: './progress-screen.component.html',
  styleUrls: ['./progress-screen.component.css']
})
export class ProgressScreenComponent implements OnInit {
  result: any;
  chapterNumber: any;
  chapterName: any;
  display=false;
  courseName: any;
  constructor(private dialog: MatDialog,private service:LoginServiceService) { }

  ngOnInit(): void {
    this.testResult();
  }
  solutions() {
    this.dialog.open(QuizResultComponent, { height: '100%', width: '50%',panelClass: 'custom'})
  }
  testResult(){
    this.service.testResult().subscribe({
      next:(data:any)=>{
        // console.log(data);
        this.chapterNumber = JSON.parse(sessionStorage.getItem('chapNo') as any);
        this.chapterName = JSON.parse(sessionStorage.getItem('chapName') as any);
        this.courseName=JSON.parse(sessionStorage.getItem('courseName') as any);
        this.result=JSON.parse(data);
        // alert(this.result.message);9
        // sessionStorage.setItem('sstatus',this.result.message)
        // console.log(this.result.correctlyAnsweredInHundred);
       
      },
      error:(e:any)=>{
        alert(e);
      }
    })
  }
  eachQues(){
    
  }
}
