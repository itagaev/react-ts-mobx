import React, { FC } from "react";
import { Paper, Typography } from "@material-ui/core";
import { Props } from "./props";

export const EmployeeInfo: FC<Props> = ({ fullName, jobTitle, workTime, gender, birthDate }) => (
  <Paper className='px-5 py-4' variant='outlined'>
    <Typography variant='body1' color='textSecondary' component='p'>
      {`ФИО: ${fullName}`}
    </Typography>
    <Typography variant='body1' color='textSecondary' component='p'>
      {`Должность: ${jobTitle}`}
    </Typography>
    <Typography variant='body1' color='textSecondary' component='p'>
      {`Занятость: ${workTime} time`}
    </Typography>
    <Typography variant='body1' color='textSecondary' component='p'>
      {`Пол: ${gender === "male" ? "Мужчина" : "Женщина"}`}
    </Typography>
    <Typography variant='body1' color='textSecondary' component='p'>
      {`Дата рождения: ${birthDate?.toLocaleString().substring(0, 10)}`}
    </Typography>
  </Paper>
);
