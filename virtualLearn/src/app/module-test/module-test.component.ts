import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { CloseTestComponent } from '../close-test/close-test.component';
import { ConfirmSubmitComponent } from '../confirm-submit/confirm-submit.component';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-module-test',
  templateUrl: './module-test.component.html',
  styleUrls: ['./module-test.component.css']
})
export class ModuleTestComponent implements OnInit {
  chapterNumber: any;
  chapterName: any;
  clicked=false;
  remTime: any;
  pause: any;
  paused: any;
  remaining: any;
  timer: any;
  interval: any;
  constructor(private dialog: MatDialog, private service: LoginServiceService,private router:Router) { }
  questions: any;
  rowClicked:any;
  chosenIndex:any;
  option:any[]=[];
  chose:any;
  notchose:any;
  answersArr: any[] = [];
  i = 0;
  counter:any;

  ngOnInit(): void {
    this.getQuestions();
    
  }
  close() {
    this.dialog.open(CloseTestComponent, { height: '25%', width: '50%'});
  }
  getQuestions() {
    this.service.courseTests().subscribe(data => {
      this.questions = JSON.parse(data);
     console.log( this.questions.options);
      console.log(this.questions);
      // console.log(this.questions.questions[this.i]);
      console.log(this.i);
      this.chapterNumber = JSON.parse(sessionStorage.getItem('chapNo') as any);
      console.log(this.chapterNumber);
      
      this.chapterName = JSON.parse(sessionStorage.getItem('chapName') as any);

      console.log(this.questions.totalQuestions);
      this.remTime=this.questions.totalTimeAlloted;
      
      this.answersArr = new Array(this.questions.totalQuestions).fill(null);
      console.log(this.answersArr);
      this.startCountdown();
    }
    )
  }
  goBack() {
    this.clicked=false;
    this.rowClicked = -1;
    if (this.i > 0) {
      this.i--;
      this.questions.questions[this.i] = this.questions.questions[this.i]
    }
  }
  goNext() {
    this.clicked=false;
    this.rowClicked = -1;
    if (this.i + 2 <= this.questions.totalQuestions) {
      this.i++;
      this.questions.questions[this.i] = this.questions.questions[this.i];
      console.log(this.i);
    }
  }


  selectedChoice(i: any) {
    // console.log(this.answersArr);
    // this.answersArr.length=this.questions.totalQuestions;
    // console.log(i);
    // if(this.answersArr.includes(empty)){
    // this.answersArr[this.i]=i;

    // this.selected=!this.selected;
    // console.log(this.selected);
    
    this.answersArr[this.i] = i;
    console.log();

    // }else{
    // this.answersArr[this.i]=i;
    // }

    console.log(this.answersArr);
  }
 
 
  changeTableRowColor(idx: any) { 
    if(this.chosenIndex != idx){
      this.clicked = false;
    }
    if(this.rowClicked === idx) this.rowClicked = -1;
    else this.rowClicked = idx;
    this.chosenIndex=idx;
    this.clicked=!this.clicked;
    if(this.clicked == false){
      this.chosenIndex=null;
    }
    console.log(this.clicked);
  }
  startCountdown() {
    this.pause=false;
    // console.log(this.remTime);
    this.counter = Number(this.remTime) ;
    if(this.pause==false){
    this.interval = setInterval(() => {
        this.counter--;
        // console.log(this.counter);
        
    if (this.counter < 0 ) {
      clearInterval(this.interval);
      this.submitTest();
    //  alert('Time is up!');
      this.router.navigate(['/congratulations'])
    }
    }, 1000);
    }
  };

  submit() {
    this.pause=true;
    sessionStorage.setItem('answers',JSON.stringify(this.answersArr));
    this.timer=sessionStorage.setItem('timer',this.counter);
    
    // this.counter = this.counter;
    let dialogRef = this.dialog.open(ConfirmSubmitComponent, { height: '40%', width: '40%'});
    dialogRef.afterClosed().subscribe(res => {
      if(res.data == 'done'){
        clearInterval(this.interval);
      }
    })
  }
  submitTest(){
    this.chose=true;
    this.notchose=false
    // clearInterval(this.interval);
    let answers=JSON.parse(sessionStorage.getItem('answers')as any);
      this.service.submit().subscribe({
        next:(data)=>{
          // console.log(data);
          let show=JSON.parse(data)
        alert(show.message);
        if(show.message=="You have already passed this test"){
          this.router.navigate(['/congratulations']);
        }else{
          alert('Test failed')
          this.router.navigate(['/courseOverview']);
        }
        },
        error:(e)=>{
          // alert(e);
          
        }
        
      })
      // this.dialogRef.close({data :  'done'})
      
    } 

}


