import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
  author: any;
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
  upVote(quote){
    for(let x of this.author.quotes){
      if(x.quote == quote){
        x.votes += 1;
        var newby = this._httpService.update(this.author);
        newby.subscribe((data: any) => {
          this.author = data.data;
          console.log(data);
        })
      }
    }
  }
  downVote(quote){
    for(let x of this.author.quotes){
      if(x.quote == quote){
        x.votes -= 1;
        console.log(x.quote);
        var newby = this._httpService.update(this.author);
        newby.subscribe((data: any) => {
          this.author = data.data;
          console.log(data);
        })
      }
    }
  }
  deleteQuote(quote){
    for(let x = 0; x < this.author.quotes.length; x++){
      if(this.author.quotes[x].quote == quote){
        this.author.quotes.splice(x, 1);
        var author = this._httpService.update(this.author);
        author.subscribe((data:any) => {
          this.author = data.data;
        })
      }
    }
  }
}
