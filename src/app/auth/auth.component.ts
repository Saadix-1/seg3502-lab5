import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
@Component({selector:'app-auth',standalone:true,imports:[FormsModule,RouterLink],template:`
<div class="auth-card"><h2>{{ mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Reset password' : 'Sign in' }}</h2>
<p class="text-muted">Your private employee directory</p>
<form (ngSubmit)="submit()">
<label>Email</label><input class="form-control mb-3" type="email" name="email" [(ngModel)]="email" required />
@if(mode !== 'reset') {<label>Password</label><input class="form-control mb-3" type="password" name="password" [(ngModel)]="password" minlength="6" required />}
@if(error){<p class="alert alert-danger">{{error}}</p>}
@if(message){<p class="alert alert-success">{{message}}</p>}
<button class="btn btn-primary w-100" [disabled]="busy">{{busy ? 'Please wait...' : mode === 'signup' ? 'Register' : mode === 'reset' ? 'Send reset email' : 'Sign in'}}</button>
</form>
@if(mode !== 'reset'){<button class="btn btn-outline-secondary w-100 mt-2" (click)="google()">Continue with Google</button>}
<div class="mt-3 text-center"><a routerLink="/sign-in">Sign in</a> · <a routerLink="/sign-up">Register</a> · <a routerLink="/password-forgot">Forgot password?</a></div></div>`})
export class AuthComponent {
  private auth = inject(AuthService); private router = inject(Router);
  email = ''; password = ''; error = ''; message = ''; busy = false;
  get mode() { return this.router.url.includes('sign-up') ? 'signup' : this.router.url.includes('password-forgot') ? 'reset' : 'signin'; }
  async submit() { this.busy = true; this.error = ''; this.message = '';
    try { if(this.mode === 'reset'){await this.auth.resetPassword(this.email);this.message = 'Password reset email sent.';}
    else {if(this.mode === 'signup') await this.auth.signUp(this.email,this.password); else await this.auth.signIn(this.email,this.password); await this.router.navigate(['/employees']);}}
    catch(e:any){this.error = e.message || 'Authentication failed.';} finally {this.busy=false;}
  }
  async google() {this.error='';try {await this.auth.googleSignIn();await this.router.navigate(['/employees']);}catch(e:any){this.error=e.message;}}
}
