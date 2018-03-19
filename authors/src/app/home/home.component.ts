import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  authors = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAll();
  }
  getAll(){
    var authors = this._httpService.getAuthors();
    authors.subscribe((data:any) => {
      console.log(data);
      this.authors = data.data;
    })
  }
  deleteAuthor(id){
    var deleted = this._httpService.deleteOne(id);
    deleted.subscribe((data: any) => {
      console.log(data.message);
      // this.authors = [];
      this.getAll();
    })
  }
}
