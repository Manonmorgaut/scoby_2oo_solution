import React from "react";
import UserContext from "./UserContext";
import apiHandler from "../../api/apiHandler";

// export const AuthContext = React.createContext();

class UserProvider extends React.Component {
  state = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
  };

  componentDidMount() {
    apiHandler
      .isLoggedIn()
      .then((data) => {
        this.setState({ user: data, isLoggedIn: true, isLoading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoggedIn: false });
      });
  }

  removeUser = () => {
    this.setState({ user: null, isLoggedIn: false });
  };

  setUser = (userInfo) => {
    this.setState({ user: userInfo });
  };

  render() {
    const contextValue = {
      user: this.state.user,
      isLoggedIn: this.state.isLoggedIn,
      removeUser: this.removeUser,
      setUser: this.setUser,
    };

    return (
      <UserContext.Provider value={contextValue}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;
