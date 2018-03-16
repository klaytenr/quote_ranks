import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  title = 'Favorite Authors';
  authors = [];
  author: object;
  newAuthor: object;
  error: any;
  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
    this.newAuthor = { name: ''};
  }
  addNewAuthor(){
    var editAuthor = this._httpService.createAuthor(this.newAuthor);
    editAuthor.subscribe((data: any) =>{
      if(data.error){
        this.error = data.error.errors.name.message;
        console.log(data.error);
      }else{
        console.log(data);
        this.authors.push(data);
        this.newAuthor = { name: ''};
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(['/home']);
  }
}
