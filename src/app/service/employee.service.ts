import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase-client';
import { AuthService } from './auth.service';
import { Employee } from '../model/employee';

export interface StoredEmployee extends Employee { id: string; }
@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private auth = inject(AuthService);
  readonly employees$: Observable<StoredEmployee[]> = this.auth.user$.pipe(switchMap(user =>
    user ? new Observable<StoredEmployee[]>(subscriber => {
      const ref = collection(firestore, 'users', user.uid, 'employees');
      return onSnapshot(ref, snapshot => subscriber.next(snapshot.docs.map(d => ({ ...d.data(), id: d.id }) as StoredEmployee)), error => subscriber.error(error));
    }) : of([])));
  private userCollection() {
    const uid = this.auth.uid;
    if (!uid) throw new Error('Please sign in first.');
    return collection(firestore, 'users', uid, 'employees');
  }
  addEmployee(employee: Employee) {
    return addDoc(this.userCollection(), { name: employee.name, dateOfBirth: employee.dateOfBirth.toISOString(), city: employee.city, salary: employee.salary, gender: employee.gender ?? '', email: employee.email ?? '' });
  }
  deleteEmployee(id: string) { return deleteDoc(doc(this.userCollection(), id)); }
}
