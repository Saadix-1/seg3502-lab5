import {Component, inject} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import { Router, RouterLink } from '@angular/router';
import {Employee} from '../model/employee';
@Component({ selector: 'app-employee', standalone: true, imports: [RouterLink, ReactiveFormsModule], templateUrl: './employee.component.html', styleUrls: ['./employee.component.css'] })
export class EmployeeComponent {
  private builder = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  error = ''; saving = false;
  employeeForm = this.builder.nonNullable.group({ name: ['', Validators.required], dateOfBirth: ['', Validators.required], city: ['', Validators.required], salary: [0, [Validators.required, Validators.min(0)]], gender: ['', Validators.pattern('^[MFX]?$')], email: ['', Validators.email] });
  async onSubmit() {
    if (this.employeeForm.invalid) return;
    this.saving = true; this.error = '';
    try {
      const e = this.employeeForm.getRawValue();
      await this.employeeService.addEmployee(new Employee(e.name, new Date(e.dateOfBirth), e.city, e.salary, e.gender, e.email));
      await this.router.navigate(['/employees']);
    } catch (err: any) { this.error = err.message || 'Unable to save employee.'; }
    finally { this.saving = false; }
  }
}
