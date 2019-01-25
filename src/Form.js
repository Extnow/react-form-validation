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

  emailInput = React.createRef();

  componentDidMount() {
    this.emailInput.current.focus();
  }

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
        passwordValid = value.length >= 6 || value.length === 0;
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
    return error.length === 0 ? '' : 'is-invalid';
  };

  render() {
    const { email, password, formErrors, formValid } = this.state;
    return (
      <form className="container mt-5">
        <h2 className="mb-3">Sign up</h2>
        <div>
          <FormErrors formErrors={formErrors} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            placeholder="username@hostname"
            type="email"
            className={`form-control ${this.errorClass(formErrors.email)}`}
            name="email"
            value={email}
            onChange={this.handleUserInput}
            ref={this.emailInput}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${this.errorClass(formErrors.password)}`}
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
