import { Component, OnInit } from '@angular/core';
import { TopicService } from './topic.service';
import { LoginService } from './../login/login.service';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  topic_id: String;
  topic: any;
  user: any;
  post_id:String;
  constructor(
    private _topicService: TopicService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.getCurrentUser()
    this._route.params.subscribe((param)=>{
      this.topic_id = param.id;
    })
    this.getTopic(this.topic_id)
  }
  getTopic(id){
    this._topicService.getTopic(id)
    .then( (topic) => {
      this.topic = topic
    })
    .catch( err => console.log(err))
  }
  createPost(formData,topic_id) {
    this._topicService.createPost(formData.value, topic_id)
    .then( () => {
      this.getTopic(topic_id)
    })
    .catch( err => console.log(err))
    formData.reset()
  }
   getCurrentUser(){
    this._loginService.getCurrentUser()
    .then( (user) => {
      this.user = user;
    })
    .catch( (err) => this._router.navigate(['/login']))
  }
  createComment(formData, post_id){
    this._topicService.createComment(formData.value, post_id)
    .then( () => {
    })
    .catch( err => console.log(err))
    formData.reset()
  }

}
