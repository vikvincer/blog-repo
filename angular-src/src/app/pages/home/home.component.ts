import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeDataService } from './home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit , OnDestroy{

  constructor(private _homeDataService:HomeDataService) { }
  blogs$:any = [];
  subscription:Subscription;
  ngOnInit() {
    this.subscription = this._homeDataService.getBlogs().subscribe(res=>{
      console.log(res);
      this.blogs$ = res
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
