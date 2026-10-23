import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { firebaseAuth } from './firebase-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user$ = new BehaviorSubject<User | null>(null);
  readonly ready$ = new BehaviorSubject<boolean>(false);
  constructor() { onAuthStateChanged(firebaseAuth, user => { this.user$.next(user); this.ready$.next(true); }); }
  get uid(): string | null { return firebaseAuth.currentUser?.uid ?? null; }
  signUp(email: string, password: string) { return createUserWithEmailAndPassword(firebaseAuth, email, password); }
  signIn(email: string, password: string) { return signInWithEmailAndPassword(firebaseAuth, email, password); }
  googleSignIn() { return signInWithPopup(firebaseAuth, new GoogleAuthProvider()); }
  resetPassword(email: string) { return sendPasswordResetEmail(firebaseAuth, email); }
  signOut() { return signOut(firebaseAuth); }
}
