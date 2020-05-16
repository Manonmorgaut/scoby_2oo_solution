import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserContext from "./Auth/UserContext";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <UserContext.Consumer>
      {(context) => {
        console.log(context);
        if (context.isLoading) {
          return <div>Loading ...</div>;
        }
        if (context.isLoggedIn) {
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
