import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getTopicUser(id){
    return this._http.get('/api/user/' + id)
    .map( (user: Response) => user.json())
    .toPromise()
  }

}
