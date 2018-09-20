import { Component, OnInit, Output } from '@angular/core';
import { HomeDataService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

 
  constructor(private _honeDataService:HomeDataService,private _router:Router) { }
  
  formStateData = {state:'add',data:[]}

  ngOnInit() {
  }
  saveBlog(data) {
    let id: any = Date.now();
    let newData = {
      "body":data.body,
      "title":data.title,
      "id":id
    }
    this._honeDataService.addBlog(newData).subscribe(
      res=>{
        this._router.navigateByUrl('/dashboard');
      },
      error=>{
        console.log(error)
      }
    )
    

  }
}
