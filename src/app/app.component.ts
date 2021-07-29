import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'vis-work';
  public _height;
  constructor() { }

  ngOnInit() {
    this._height = screen.height;
  }

}
