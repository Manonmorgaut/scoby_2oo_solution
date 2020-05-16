import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./views/Home";
import Profile from "./views/Profile";
import About from "./views/About";
import ItemForm from "./components/Items/ItemForm";
import apiHandler from "./api/apiHandler";
import Signup from "./views/Signup";
import Signin from "./views/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import FormProfile from "./components/Forms/FormProfile";

class App extends React.Component {
  state = {
    items: [],
    displayForm: false,
  };

  componentDidMount() {
    apiHandler
      .getItems()
      .then((data) => {
        this.setState({ items: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addItem = (item) => {
    this.setState({ items: [...this.state.items, item] });
  };

  toggleFormDisplay = (event) => {
    this.setState({ displayForm: !this.state.displayForm });
  };

  handleClose = (event) => {
    this.setState({ displayForm: false });
  };

  render() {
    return (
      <div className="App">
        <NavMain toggleFormDisplay={this.toggleFormDisplay} />

        <main className="page">
          {this.state.displayForm && (
            <ItemForm handleClose={this.handleClose} addItem={this.addItem} />
          )}

          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  items={this.state.items}
                  onSelectItem={this.onSelectItem}
                />
              )}
            />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute
              exact
              path="/profile/settings"
              component={FormProfile}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
