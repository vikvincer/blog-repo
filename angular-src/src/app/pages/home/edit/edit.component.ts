import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeDataService } from '../home.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

    formStateData = { state: 'edit', data: null }
    parmId: any;
    constructor(private _homeDataService: HomeDataService, private _activeRouter: ActivatedRoute, private _router: Router) { }

    ngOnInit() {
        this._activeRouter.params.subscribe(param => {
            if (param.id) {
                this.parmId = param.id;
                this._homeDataService.getBLog(param.id).subscribe(response => {
                    this.formStateData.data = response
                });
            }
        });
    }
    ngOnDestroy() {

    }
    updateBlog(data) {
        let newData = {
            title: data.title,
            body: data.body
        }
        this._homeDataService.updateBlog(this.parmId, newData).subscribe(response => {
            console.log('update', response);
            if (response) {
                // /post/{{blog.id}}
                this._router.navigateByUrl(`/post/${this.parmId}`);
            }
        });
    }

}
