import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  
  registerApi:string = `http://localhost:8080/api/posts`;
  httpOptions = {
    headers: new HttpHeaders({
        "Content-type": "application/json; charset=UTF-8"
    })
  };

  constructor(private _http:HttpClient) { }

  addBlog(data) {
      return this._http.post(this.registerApi,data,this.httpOptions).pipe(map(data=>data));
  }
  getBlogs (): Observable<any> {
    return this._http.get(this.registerApi,this.httpOptions).pipe(map(data=>data));
  }
  getBLog(id):Observable<any> {
    return this._http.get(`${this.registerApi}/${id}`,this.httpOptions).pipe(map(data=>data));
  }
  deleteBlog(id) {
    return this._http.delete(`${this.registerApi}/${id}`,this.httpOptions).pipe(map(data=>data));
  }
  updateBlog(id,data) {
    return this._http.put(`${this.registerApi}/${id}`,{body:data.body,title:data.title},this.httpOptions).pipe(map(data=>data));
  }


}
