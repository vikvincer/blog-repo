import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {

  menuActive:boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleMenu() {
    this.menuActive = (this.menuActive == false ? true : false);
  }
}
