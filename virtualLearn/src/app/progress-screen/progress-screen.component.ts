import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizResultComponent } from '../quiz-result/quiz-result.component';
@Component({
  selector: 'app-progress-screen',
  templateUrl: './progress-screen.component.html',
  styleUrls: ['./progress-screen.component.css']
})
export class ProgressScreenComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  solutions() {
    this.dialog.open(QuizResultComponent, { height: '100%', width: '50%',panelClass: 'custom', })
  }
}
