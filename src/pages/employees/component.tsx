import React, { FC, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

import { store } from "../../store";
import { getEmployees } from "../../common";
import { EmployeeCard } from "../../components";

export const EmployeesPage: FC = observer(() => {
  useEffect(() => {
    store.setEmployees(getEmployees());
  }, []);

  return (
    <div className='d-flex flex-column align-items-center mb-5'>
      <Typography className='text-center mb-5' variant='h4'>
        Список сотрудников
      </Typography>

      <Grid className='mb-4' container spacing={4}>
        {store.employees.map((employee) => (
          <Grid key={`employees-${employee.id}`} item sm={12} md={6} lg={4}>
            <EmployeeCard key={`employee-card-${employee.id}`} {...employee} />
          </Grid>
        ))}
      </Grid>

      <Link to={{ pathname: "/employees/0", search: "?mode=create" }}>
        <Button className='my-5' variant='contained' color='primary'>
          Добавить сотрудника
        </Button>
      </Link>
    </div>
  );
});
