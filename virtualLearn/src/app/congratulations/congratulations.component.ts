import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit {
  chapterNumber: any;
  chapterName: any;
  courseName: any;
  titleName: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.chapterNumber = JSON.parse(sessionStorage.getItem('chapNo') as any);
        this.chapterName = JSON.parse(sessionStorage.getItem('chapName') as any);
        this.courseName=JSON.parse(sessionStorage.getItem('courseName') as any);
        this.titleName=JSON.parse(sessionStorage.getItem('titleName') as any)
  }
result(){
  this.router.navigate(['/progressScreen']);
}
}
