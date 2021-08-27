import React, { FC, useEffect, useRef } from "react";
import { createTheme, ThemeProvider, Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { EmployeesPage, EmployeePage } from "./pages";
import { seedEmployees } from "./common";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});

export const App: FC = () => {
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      seedEmployees();
      console.log("seed");
      firstRender.current = false;
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container className='mt-5 pt-4'>
        <Router>
          <Switch>
            <Route path='/employees' exact>
              <EmployeesPage />
            </Route>

            <Route path='/employees/:id' exact>
              <EmployeePage />
            </Route>

            <Route path='/'>
              <Redirect to='/employees' />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
};
