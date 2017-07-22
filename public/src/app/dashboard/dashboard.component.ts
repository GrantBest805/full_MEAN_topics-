import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login/login.service';
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topics: Array<any>;
  user: any;
  categories: Array<any>;
  constructor(
    private _dashboardService: DashboardService,
    private _loginService: LoginService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getTopics()
    this.getCurrentUser()
    this.getCategories()
  }
  getCurrentUser(){
    this._loginService.getCurrentUser()
    .then( (user) => {
      this.user = user;
    })
    .catch( (err) => this._router.navigate(['/login']))
  }
  getCategories() {
    this._dashboardService.getCategories()
    .then( (categories) => {
      this.categories = categories;
    })
    .catch( (err) => console.log(err))
  }
  createTopic(formData){
    console.log(formData.value)
    this._dashboardService.createTopic(formData.value)
    .then( (topic) => {
      formData.reset()
      this.getTopics()
    })
    .catch( (err) => console.log(err))
  }
  getTopics(){
    this._dashboardService.getTopics()
    .then( (topics) => {
      this.topics = topics;
    })
    .catch( (err) => console.log(err))
  }

}
