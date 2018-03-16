import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title = 'Favorite Authors';
  author: object;
  error: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.getAuthor(params['id']));
  }
  getAuthor(id){
    var author = this._httpService.getOneAuthor(id);
    author.subscribe((data: any) => {
      this.author = data.data;
    })
    console.log(this.author);
  }
  editAuthor(author){
    var editedAuthor = this._httpService.editOne(author);
    editedAuthor.subscribe((data:any) => {
      if(data.error){
        this.error = data.error;
        console.log(data.error);
      }else{
        console.log(data);
        this.author = data.author;
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(['/home']);
  }
}
