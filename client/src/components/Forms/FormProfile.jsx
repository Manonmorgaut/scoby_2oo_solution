import React, { Component } from "react";
import UserContext from "../Auth/UserContext";
import Button from "../Button";
import apiHandler from "../../api/apiHandler";
import "../../styles/form.css";
import UploadWidget from "../UploadWidget";

class FormProfile extends Component {
  static contextType = UserContext;

  state = {
    tmpUrl: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value =
      event.target.type === "file"
        ? event.target.files[0]
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    this.setState({ [key]: value });
  };

  isValidInput = (key) => {
    if (this.state[key] === "") {
      return false;
    } else return true;
  };

  checkError = () => {
    for (const key in this.state) {
      if (key === "tmpUrl") continue;
      if (this.state[key] === "") {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();

    for (const key in this.state) {
      if (key === "tmpUrl") continue;
      fd.append(key, this.state[key]);
    }
    console.log(this.state);
    apiHandler
      .updateUser(fd)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleFileSelect = ({ tmpUrl, file }) => {
    this.setState({ tmpUrl: tmpUrl, profileImg: file });
  };

  render() {
    const { user } = this.context;
    if (!user) return <div>Loading...</div>;
    return (
      <section className="form-section">
        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h1 className="header">Edit profile</h1>

          <div className="round-image user-image">
            <img
              src={this.state.tmpUrl || user.profileImg}
              alt={user.firstName}
            />
          </div>
          <div className="form-group">
            <UploadWidget
              onFileSelect={this.handleFileSelect}
              name="profileImg"
            >
              Change profile image
            </UploadWidget>
          </div>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
              defaultValue={user.firstName}
            />
            {!this.isValidInput("firstName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
              defaultValue={user.lastName}
            />
            {!this.isValidInput("lastName") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              className="input"
              id="phoneNumber"
              type="text"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
            />
            {!this.isValidInput("phoneNumber") && (
              <p className="input-error">Invalid input</p>
            )}
          </div>
          <Button primary disabled={this.checkError()}>
            Save
          </Button>
        </form>
      </section>
    );
  }
}

export default FormProfile;
