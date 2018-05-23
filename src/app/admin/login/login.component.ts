import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles:[`
  .center{
    width: 75%;
  }
  
  .main-div{
    margin-top:40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `]
})

export class LoginComponent implements OnInit {
  constructor() {
  }

  public ngOnInit() {
  }
}