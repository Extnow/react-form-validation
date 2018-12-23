import React, { Component } from 'react';
import FormErrors from './FormErrors';

export default class Form extends Component {
  state = {
    email: '',
    password: '',
    formErrors: {
      email: '',
      password: '',
    },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ''
          : ' is invalid, please enter email like username@hostname';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid,
        passwordValid,
      },
      this.validateForm,
    );
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateField(name, value),
    );
  };

  errorClass = error => {
    return error.length === 0 ? '' : 'has-error';
  };

  render() {
    const { email, password, formErrors, formValid } = this.state;
    return (
      <form className="container mt-5">
        <h2 className="mb-3">Sign up</h2>
        <div>
          <FormErrors formErrors={formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={this.handleUserInput}
          />
        </div>
        <div className={`form-group ${this.errorClass(formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={this.handleUserInput}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!formValid}>
          Sign up
        </button>
      </form>
    );
  }
}
