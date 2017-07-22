import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
@Injectable()
export class DashboardService {

  constructor(private _http: Http) { }
  getCategories(){
    return this._http.get('/api/dashboard')
    .map( (categories: Response) => categories.json())
    .toPromise()
  }
  createTopic(topic) {
    return this._http.post('/api/dashboard', topic)
    .map( (topic: Response) => topic.json())
    .toPromise()
  }
  getTopics() {
    return this._http.get('/api/topic')
    .map( (topics: Response) => topics.json())
    .toPromise()
  }
}
