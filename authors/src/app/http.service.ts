import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient) { }
  createAuthor(author){
    return this._http.post('/authors', author);
  }
  getOneAuthor(id){
    return this._http.get('/authors/' + id);
  }
  getAuthors(){
    return this._http.get('/authors');
  }
  deleteOne(id){
    return this._http.delete('/authors/' + id);
  }
  editOne(author){
    return this._http.put('/edit/'+author._id, author)
  }
}
