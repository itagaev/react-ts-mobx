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
        gender: "male",
      },
    ] as IEmployee[])
  );

export const getEmployees = () => JSON.parse(localStorage.getItem("employees") as string);
