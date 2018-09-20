import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeDataService } from '../home.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  blog:any = null;
  constructor(private _activeRouter:ActivatedRoute,private _homeDataService:HomeDataService) { }
  ngOnInit() {
    this._activeRouter.params.subscribe(param=>{
      if(param.id) {
        this._homeDataService.getBLog(param.id).subscribe(response=>{
          this.blog = response
        });
      }
    });

  }

}
