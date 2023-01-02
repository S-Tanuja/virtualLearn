import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {
  solutions:any;
  displayAll=true;
  index:any;
  constructor(private service : LoginServiceService ) { }

  ngOnInit(): void {
    this.service.testResult().subscribe(data=>{
      this.solutions=JSON.parse(data)
      console.log(this.solutions);
      console.log(this.solutions.selectedAndActualAnswerSet[0][1]);
      this.index = sessionStorage.getItem('index')
      console.log(this.index)
    })
  }



}
