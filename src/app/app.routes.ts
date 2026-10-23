import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './service/auth.guard';
export const routes: Routes = [
 {path:'sign-in',component:AuthComponent}, {path:'sign-up',component:AuthComponent}, {path:'password-forgot',component:AuthComponent},
 {path:'employee',component:EmployeeComponent,canActivate:[authGuard]},
 {path:'employees',component:EmployeesComponent,canActivate:[authGuard]},
 {path:'',redirectTo:'sign-in',pathMatch:'full'}, {path:'**',redirectTo:'sign-in'}
];
