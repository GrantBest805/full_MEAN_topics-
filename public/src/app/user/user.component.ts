import { Component, OnInit } from '@angular/core';
import { LoginService } from './../login/login.service';
import { UserService } from './user.service';
import { Router, Routes, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user_id: String;
  user: any;
  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((param) =>{
      this.user_id = param.id;
      console.log(this.user_id)
    })
    this.getTopicUser(this.user_id)
  }


  getTopicUser(id){
    this._userService.getTopicUser(id)
    .then( (user) => {
      this.user = user;
    })
    .catch( (err) => this._router.navigate(['/login']))
  }
}
