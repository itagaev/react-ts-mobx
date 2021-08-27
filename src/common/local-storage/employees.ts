import { IEmployee } from "../../models";

export const seedEmployees = () =>
  localStorage.setItem(
    "employees",
    JSON.stringify([
      {
        id: "1",
        fullName: "Tagayev Ilyas",
        birthDate: new Date(),
        jobTitle: "frontend",
        workTime: "full",
        gender: "male",
      },
      {
        id: "2",
        fullName: "Alexey Aleksandrovich",
        birthDate: new Date(),
        jobTitle: "backend",
        workTime: "part",
        gender: "male",
      },
      {
        id: "3",
        fullName: "Vladimir Victorovich",
        birthDate: new Date(),
        jobTitle: "CEO",
        workTime: "full",
        gender: "male",
      },
      {
        id: "4",
        fullName: "Andrey Mikhaylovich",
        birthDate: new Date(),
        jobTitle: "PM",
        workTime: "full",
        gender: "male",
      },
      {
        id: "5",
        fullName: "Anna Yur`evna",
        birthDate: new Date(),
        jobTitle: "HR",
        workTime: "full",
        gender: "female",
      },
    ] as IEmployee[])
  );

export const getEmployees = () => JSON.parse(localStorage.getItem("employees") as string);

export const getEmployee = (employeeId: string): IEmployee | undefined =>
  (JSON.parse(localStorage.getItem("employees") as string) as IEmployee[]).find(({ id }) => id === employeeId);

export const deleteEmployeeFromLS = (employeeId: string) => {
  const storage = JSON.parse(localStorage.getItem("employees") as string);

  if (storage) {
    localStorage.setItem("employees", JSON.stringify(storage.filter(({ id }: IEmployee) => id !== employeeId)));
  }
};

export const updateEmployeeLS = (employees: IEmployee[]) => {
  localStorage.removeItem("employees");
  localStorage.setItem("employees", JSON.stringify(employees));
};
