import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continue-watching',
  templateUrl: './continue-watching.component.html',
  styleUrls: ['./continue-watching.component.css']
})
export class ContinueWatchingComponent implements OnInit {
  pausedTime:any;
  constructor() { }

  ngOnInit(): void {
    sessionStorage.getItem('pauseddTime')
    this.pausedTime= sessionStorage.getItem('watchedTime');
   

    // this.pausedTime=(Math.floor(this.pausedTime));
    
  }

}
