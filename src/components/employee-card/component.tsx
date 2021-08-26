import React, { FC } from "react";
import { Card, CardActionArea, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { useHistory } from "react-router";

import { Props } from "./props";
import { store } from "../../store";

export const EmployeeCard: FC<Props> = ({ id, fullName, workTime, jobTitle }) => {
  const history = useHistory();

  return (
    <Card>
      <CardActionArea onClick={() => history.push(`/employees/${id}`)}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {fullName}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`Должность: ${jobTitle}`}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {`Занятость: ${workTime} time`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='secondary' onClick={() => store.deleteEmployee(id)}>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};
