import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import "../styles/Profile.css";
import "../styles/form.css";

class Profile extends Component {
  static contextType = UserContext;

  state = {
    phoneNumber: "",
  };

  submitPhoneNumber = (event) => {
    event.preventDefault();
    apiHandler
      .updateUser(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handlePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  render() {
    const { user } = this.context;
    if (!user) return null;

    return (
      <section className="Profile">
        <div className="user-image round-image">
          <img src={user.profileImg} alt={user.firstName} />
        </div>
        <div className="user-presentation">
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <Link className="link" to="/profile/settings">
            Edit profile
          </Link>
        </div>

        <div className="user-contact">
          <h4>Add a phone number</h4>

          <form
            className="form"
            onChange={this.handlePhoneNumber}
            onSubmit={this.submitPhoneNumber}
          >
            <div className="form-group">
              <label className="label" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                className="input"
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                defaultValue={this.context.user.phoneNumber || ""}
                placeholder="Add phone number"
              />
            </div>
            <Button primary>Add phone number</Button>
          </form>
        </div>

        <div className="stack-empty">
          <div className="">
            <img src="/media/personal-page-empty-state.svg" alt="" />
          </div>
          <p>You don't have any items :(</p>
        </div>

        {/* <div className="stack">
          <h3>Your items</h3>
          <div className="stack__item">
            <div className="round__image">
              <img src="{{this.image}}" alt="{{this.name}}" />
            </div>
            <div className="stack__item__description">
              <h2>this.name</h2>
              <h4>Quantity: this.quantity </h4>
              <p>this.description</p>
              <div class="stack__item__buttons">
                <a href="/personal/delete/{{this._id}}">
                  <button>Delete</button>
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    );
  }
}

export default Profile;
