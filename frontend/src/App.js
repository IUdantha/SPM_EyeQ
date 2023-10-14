import React, {useState, useCallback} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Auth from "./user/pages/Auth";
import Home from "./user/pages/Home";
import EBlinkFun from "./functions/eBlinkFun/pages/EBlinkFun";
import PrescriptionFun from "./functions/prescriptionFun/pages/PrescriptionFun";
import ReservationFun from "./functions/reservationFun/pages/ReservationFun";
import VTestFun from "./functions/vTestFun/pages/VTestFun";
import MainNavigation from "./common/components/Navigation/MainNavigation";
import {AuthContext} from "./common/context/auth-context";

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <Route path="/EBlinkFun" exact>
          <EBlinkFun />
        </Route>
        <Route path="/PrescriptionFun">
          <PrescriptionFun />
        </Route>
        <Route path="/ReservationFun">
          <ReservationFun />
        </Route>
        <Route path="/VTestFun">
          <VTestFun />
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
