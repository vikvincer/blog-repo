import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeDataService } from '../home.service';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  filterResult:FormGroup;  
  blogs:any = [];
  // blogsFiltered:any = [];
  subscription:Subscription;
  fiterText:string;

  constructor(private _homeDataService:HomeDataService) {
   }

  ngOnInit() {
    this.subscription = this._homeDataService.getBlogs().subscribe(res=>{
      this.blogs = res;
      // this.blogsFiltered = this.blogs;
    });
    this.filterResult = new FormGroup({
      filter: new FormControl('')
    });

    this.filterResult.controls.filter.valueChanges.pipe(debounceTime(500)).
      subscribe(filter=>{
        this.fiterText = filter;
      })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  textFilter(textFilter) {
    let newData = [];
    if(textFilter) {
      this.blogs.map(data => {
        if(data.title.toLowerCase().match(`${textFilter.toLowerCase()}`) || data.title.toLowerCase().replace(/\s/g, '').match(`${textFilter.toLowerCase().replace(/\s/g, '')}`)) {
          newData.push(data);
        }
      })
        return newData;
    }else {
      return this.blogs;
    }
    
  }
  deleteBlog(id,index) {
    var result = confirm("Want to delete?");
    if (result) {
        this.subscription = this._homeDataService.deleteBlog(id).subscribe(res=>{
          this.blogs.splice(index, 1);
        });
    }
  }

}
