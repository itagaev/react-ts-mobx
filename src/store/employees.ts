import { makeAutoObservable } from "mobx";
import { deleteEmployeeFromLS, updateEmployeeLS } from "../common";

import { IEmployee } from "../models";

const addEmployee = (employees: IEmployee[], newEmployee: IEmployee) => [...employees, { ...newEmployee }];

const updateEmployee = (employees: IEmployee[], updatedEmployee: IEmployee) => {
  const newEmployees = [...employees];
  const indexOfUpdatedEmployee = newEmployees.findIndex(({ id }) => id === updatedEmployee.id);
  newEmployees[indexOfUpdatedEmployee] = updatedEmployee;
  return newEmployees;
};

export class EmployeesStore {
  employees: IEmployee[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addEmployee(newEmployee: IEmployee) {
    const result = addEmployee(this.employees, newEmployee);
    this.employees = result;
    updateEmployeeLS(result);
  }

  updateEmployee(updatedEmployee: IEmployee) {
    const result = updateEmployee(this.employees, updatedEmployee);
    this.employees = result;
    updateEmployeeLS(result);
  }

  deleteEmployee(deleteId: string) {
    deleteEmployeeFromLS(deleteId);
    this.employees = this.employees.filter(({ id }) => id !== deleteId);
  }

  setEmployees(employees: IEmployee[]) {
    this.employees = employees;
  }
}
