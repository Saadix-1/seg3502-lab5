import {Component, inject} from '@angular/core';
import {EmployeeService, StoredEmployee} from '../service/employee.service';
import {RouterLink} from '@angular/router';
import {AsyncPipe, DatePipe, NgFor} from '@angular/common';
@Component({selector:'app-employees', standalone:true, imports:[RouterLink, NgFor, AsyncPipe, DatePipe], templateUrl:'./employees.component.html', styleUrls:['./employees.component.css']})
export class EmployeesComponent {
  protected employees = inject(EmployeeService);
  error = '';
  async remove(emp: StoredEmployee) {
    if (!confirm(`Delete ${emp.name}?`)) return;
    try { await this.employees.deleteEmployee(emp.id); } catch (e: any) { this.error = e.message; }
  }
}
