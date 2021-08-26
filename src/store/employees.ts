import { makeAutoObservable } from "mobx";

import { IEmployee } from "../models";

const addEmployee = (employees: IEmployee[], newEmployee: IEmployee) => [...employees, { ...newEmployee }];

export class EmployeesStore {
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addEmployee(newEmployee: IEmployee) {
    this.employees = addEmployee(this.employees, newEmployee);
  }

  deleteEmployee(deleteId: string) {
    this.employees = this.employees.filter(({ id }) => id !== deleteId);
  }

  setEmployees(employees: IEmployee[]) {
    this.employees = employees;
  }
}
