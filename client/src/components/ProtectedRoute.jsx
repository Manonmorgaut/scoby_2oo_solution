import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "./Auth/UserContext";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <UserContext.Consumer>
      {(userContext) => {
        if (userContext.isLoggedIn) {
          return (
            <Route {...rest} render={(props) => <Component {...props} />} />
          );
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    </UserContext.Consumer>
  );
}

export default ProtectedRoute;
