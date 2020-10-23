import { Component, Input, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title:string;
  
  constructor() { }

  ngOnInit() {}

}
