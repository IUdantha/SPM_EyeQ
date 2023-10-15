import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Home from "./user/pages/Home";
import ETestFun from "./functions/eBlinkFun/pages/ETestFun";
import PrescriptionFun from "./functions/prescriptionFun/pages/PrescriptionFun";
import ReservationFun from "./functions/reservationFun/pages/ReservationFun";
import VTestFun from "./functions/vTestFun/pages/VTestFun";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import { AuthContext } from "./common/context/auth-context";
import PaymentForm from "./functions/reservationFun/components/PaymentForm";
import Success from "./functions/reservationFun/components/Success";
import AppointmentTable from "./functions/reservationFun/pages/AppointmentTable";
import AppointmentEdit from "./functions/reservationFun/pages/AppointmentEdit";
import Aform from "./functions/reservationFun/pages/Aform";
import DoctorList from "./functions/reservationFun/pages/DoctorDetails";
import NewAddForm from "./functions/prescriptionFun/pages/NewAddForm";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/ETestFun" exact>
          <ETestFun />
        </Route>
        <Route path="/PrescriptionFun">
          <PrescriptionFun />
        </Route>
        <Route path="/Pres/add">
          <NewAddForm />
        </Route>
        <Route path="/ReservationFun">
          <ReservationFun />
        </Route>
        <Route path="/VTestFun">
          <VTestFun />
        </Route>

        <Route path="/Aform">
          <Aform />
        </Route>
        <Route path="/Aedit/:id">
          <AppointmentEdit />
        </Route>

        <Route path="/doctors">
          <DoctorList />
        </Route>
        <Route path="/apptable">
          <AppointmentTable />
        </Route>

        <Route path="/pp">
          <PaymentForm />
        </Route>
        <Route path="/success">
          <Success />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
