export type IEmployee = {
  id: string;
  fullName: string;
  birthDate: Date;
  gender: "male" | "female";
  jobTitle: "frontend" | "backend" | "PM" | "CEO" | "HR";
  workTime: "full" | "part";
};
