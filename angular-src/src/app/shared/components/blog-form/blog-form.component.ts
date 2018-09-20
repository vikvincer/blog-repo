import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  formData:FormGroup;

  @Output() OutputData:EventEmitter<any> = new EventEmitter();
  @Input('formStateData') formStateData;

  constructor() { }
  ngOnInit() {
    if(this.formStateData.state === 'edit') {      
      this.formData = new FormGroup({
        title: new FormControl(this.formStateData.data.title, Validators.required),
        body:new FormControl(this.formStateData.data.body, Validators.required)
      });
      console.log(this.formStateData.data.body);
    } else {
      this.formData = new FormGroup({
        title: new FormControl('', Validators.required),
        body:new FormControl('', Validators.required)
      });
    }
  }
  onSubmit() {
    if(this.formData.status === 'VALID') {
      this.OutputData.emit(this.formData.value);
    }
  }

}
