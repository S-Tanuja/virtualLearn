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
  option:any;
  chose:any;
  notchose:any;
  answersArr: any[] = [];
  i = 0;
  counter:any;
  index:any;
  option1:any;
  qstn:any;
  highlightArr:any;
  myOptions:any[]=[];
  finalArray:any[]=[];
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


  modifyQuestionData() {
    for (let i = 0; i < this.questions.totalQuestions.length; i++) {
      this.myOptions = []
      let question = {
        questionName: this.questions.totalQuestions[i],
        questionNumber: i + 1,
        options: this.modifyOptions(this.questions.options[i])
      }
      this.finalArray.push(question)
    }
    console.log("final Array", this.finalArray);
  }



  modifyOptions(options: any): any {
    for (let j = 0; j < options.length; j++) {
      let opt =
      {
        value: options[j],
        isSelcted: false,
        index: j
      }
      this.myOptions.push(opt)
    }
    return this.myOptions;

  }
  saveAnswer(opt: any) {

    console.log(opt)

    let options = this.singleQuestion.options;

    console.log(options)

    options.map((el: any) => {

      if (el.index == opt.index) {

        el.isSelcted = true

        // this.optionRequestForApi.push(opt.index)

      } else {

        el.isSelcted = false;

        // this.optionRequestForApi.push(null)

      }

    })

    console.log(options);

    console.log(this.finalArray)

  }


  goBack() {
    this.clicked=false;
    // this.rowClicked = -1;
    if (this.i > 0) {
      this.i--;
      this.questions.questions[this.i] = this.questions.questions[this.i]
    }
  }
  goNext() {
    this.clicked=false;
    // this.rowClicked = -1;
    if (this.i + 2 <= this.questions.totalQuestions) {
      this.i++;
      this.questions.questions[this.i] = this.questions.questions[this.i];
      // console.log(this.i);
    }
  }


  selectedChoice(i: any) {
    this.answersArr[this.i] = i;
    this.index = i;
    this.qstn = this.answersArr.indexOf(i)+1;
    console.log();
    console.log(this.answersArr);
  }
 
 
  // changeTableRowColor(idx: any) { 
  //   if(this.chosenIndex != idx){
  //     this.clicked = false;
  //   }
  //   if(this.rowClicked === idx) this.rowClicked = -1;
  //   else this.rowClicked = idx;
  //   this.chosenIndex=idx;
  //   this.clicked=!this.clicked;
  //   if(this.clicked == false){
  //     this.chosenIndex=null;
  //   }

  // }
  startCountdown() {
    this.pause=false;
    this.counter = Number(this.remTime) ;
    if(this.pause==false){
    this.interval = setInterval(() => {
        this.counter--;     
    if (this.counter <= 0 ) {
      this.submitTest();
      clearInterval(this.interval);
      
     

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
           this.router.navigate(['/congratulations'])
          let show=JSON.parse(data)
        // alert(show.message);
        if(show.message=="You have already passed this test"){
          this.router.navigate(['/congratulations']);
        }else{
          // alert('Test failed')
          this.router.navigate(['/courseOverview']);
        }
        },
        error:(e)=>{      
        }
        
      })
   
    } 

}


