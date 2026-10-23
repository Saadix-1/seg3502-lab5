import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './service/auth.service';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,AsyncPipe],templateUrl:'./app.component.html',styleUrls:['./app.component.css']})
export class AppComponent { auth=inject(AuthService);router=inject(Router);async logout(){await this.auth.signOut();await this.router.navigate(['/sign-in']);} }
