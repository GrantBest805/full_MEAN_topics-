import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';

@Injectable()
export class TopicService {

  constructor(private _http: Http) { }

  getTopic(id){
    return this._http.get('/api/topic/'+ id)
    .map( (topic: Response) => topic.json())
    .toPromise()
  }
  createPost(post, id){
    console.log("()()()()()()",post)
    return this._http.post('/api/topic/'+ id, post)
    .map( (post: Response) => post.json())
    .toPromise()
  }
  createComment(comment, id){
    return this._http.post('/api/topic/comment/' + id, comment)
    .map( (comment: Response) => comment.json())
    .toPromise()
  }

}
