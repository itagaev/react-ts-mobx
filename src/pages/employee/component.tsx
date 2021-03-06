/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { Typography, Button, FormControl, Input, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { v4 as uuid } from "uuid";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

import { store } from "../../store";
import { getEmployee } from "../../common";
import { IEmployee } from "../../models";
import { EmployeeInfo } from "../../components/employee-info";

export const EmployeePage: FC = observer(() => {
  const params: { id: string } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [mode, setMode] = useState<null | string>(null);
  const [employee, setEmployee] = useState<IEmployee | null>(null);

  useEffect(() => {
    const employee = getEmployee(params.id);

    if (typeof employee !== "undefined") {
      setEmployee(getEmployee(params.id)!);
    }
  }, [params.id]);

  useEffect(() => {
    const { search } = location;

    if (search) {
      const mode = search.substring(1).split("=")[1];

      if (mode === "create") {
        setEmployee({
          id: uuid(),
          fullName: "",
          gender: "male",
          jobTitle: "frontend",
          birthDate: new Date(),
          workTime: "full",
        });
      }
      setMode(mode);
    } else {
      setMode(null);
    }
  }, [location.search]);

  const handleDeleteClick = (employeeId: string) => {
    history.push("/employees");
    store.deleteEmployee(employeeId);
  };

  const handleEditOrCreateClicked = (e: React.FormEvent) => {
    e.preventDefault();

    if (employee?.fullName) {
      if (mode === "edit") {
        store.updateEmployee(employee!);
        setMode(null);
      } else {
        store.addEmployee(employee!);
        history.push("/employees");
      }
    }
  };

  return (
    <div className='d-flex flex-column align-items-center mb-5'>
      <Link to={{ pathname: "/employees" }}>
        <Button className='mb-5' variant='contained' color='primary'>
          ?? ???????????? ??????????????????????
        </Button>
      </Link>

      {!mode ? (
        <>
          <Typography className='text-center mb-5' variant='h4'>
            ???????????????????? ?? ????????????????????
          </Typography>

          {employee ? (
            <>
              <EmployeeInfo {...employee} />

              <div className='mt-5 d-flex justify-content-center'>
                <Link to={{ pathname: `/employees/${employee.id}`, search: "?mode=edit" }}>
                  <Button variant='contained' color='primary'>
                    ??????????????????????????
                  </Button>
                </Link>

                <Button
                  style={{ marginLeft: "16px" }}
                  variant='contained'
                  color='secondary'
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  ??????????????
                </Button>
              </div>
            </>
          ) : (
            <Typography className='mx-auto mb-5' variant='h6'>
              404 Not Found
            </Typography>
          )}
        </>
      ) : (
        <>
          <Typography className='text-center mb-5' variant='h4'>
            ???????????????????????????? ?????? ???????????????????? ????????????????????
          </Typography>

          <form onSubmit={handleEditOrCreateClicked} className='w-100 d-flex flex-column'>
            <FormControl>
              <InputLabel htmlFor='fullName'>??????</InputLabel>
              <Input
                value={employee?.fullName}
                onChange={(e) => setEmployee({ ...employee, fullName: e.currentTarget.value } as IEmployee)}
                id='fullName'
              />
            </FormControl>

            <FormControl>
              <InputLabel id='jobTitle'>??????????????????</InputLabel>
              <Select
                labelId='jobTitle'
                value={employee?.jobTitle}
                onChange={(e) => setEmployee({ ...employee, jobTitle: e.target.value } as IEmployee)}
              >
                <MenuItem value='frontend'>Frontend</MenuItem>
                <MenuItem value='backend'>Backend</MenuItem>
                <MenuItem value='HR'>HR</MenuItem>
                <MenuItem value='CEO'>CEO</MenuItem>
                <MenuItem value='PR'>PR</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id='gender'>??????</InputLabel>
              <Select
                labelId='gender'
                value={employee?.gender}
                onChange={(e) => setEmployee({ ...employee, gender: e.target.value } as IEmployee)}
              >
                <MenuItem value='male'>??????????????</MenuItem>
                <MenuItem value='female'>??????????????</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel id='workTime'>??????????????????</InputLabel>
              <Select
                labelId='workTime'
                value={employee?.workTime}
                onChange={(e) => setEmployee({ ...employee, workTime: e.target.value } as IEmployee)}
              >
                <MenuItem value='part'>??????????????????</MenuItem>
                <MenuItem value='full'>????????????</MenuItem>
              </Select>
            </FormControl>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='???????? ????????????????'
                value={employee?.birthDate}
                onChange={(date) => setEmployee({ ...employee, birthDate: date } as IEmployee)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>

            <Button type='submit' className='mt-5' variant='contained' color='primary'>
              ??????????????????
            </Button>
          </form>
        </>
      )}
    </div>
  );
});
