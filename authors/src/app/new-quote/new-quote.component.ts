import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {
  author: any;
  newQuote: any;
  error: any;
  constructor(private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.newQuote = { name: '', votes: 0};
    this._route.params.subscribe((params: Params) => this.getAuthor(params['id']));
  }
  getAuthor(id){
    var author = this._httpService.getOneAuthor(id);
    author.subscribe((data: any) => {
      this.author = data.data;
    })
    console.log(this.author);
  }
  addNewQuote(){
    var newQuote = this._httpService.createQuote(this.newQuote, this.author._id);
    newQuote.subscribe((data: any) =>{
      if(data.error){
        this.error = data.error.errors.name.message;
        console.log(data.error);
      }else{
        console.log(data);
        this.newQuote = { name: '', votes: 0};
        this.goHome();
      }
    })
  }
  goHome(){
    this._router.navigate(['/quotes/', this.author._id]);
  }
}