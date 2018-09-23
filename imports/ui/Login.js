import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import SimpleSchema from 'simpl-schema'

/* eslint-disable */
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Nav, Navbar, NavDropdown, MenuItem, NavItem, PageHeader } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
/* eslint-enable */

SimpleSchema.debug = true

const schema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  password: {
    type: String,
    min: 4,
  },
  fullName: {
    type: String,
    optional: true,
  },
},{
  clean: {
    filter: true,
    mutate: true,
    trimStrings: true,
    removeEmptyStrings: false,
  },
},{ tracker: Tracker })
const validationContext = schema.newContext('formContext')

// Tracker.autorun(function () {
//   const form = { email: this.state.email, password: this.state.password, fullName: this.state.fullName }
//   console.log('autorun: ', validationContext.validate(form))
// })

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      showingFieldValidations: false,
      email: '',
      password: '',
      fullName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  validateForm() {
    console.log('validateForm')
    const form = { email: this.state.email, password: this.state.password, fullName: this.state.fullName }
    console.log('validate: ', validationContext.validate(form)) // eslint-disable-line
    console.log('validator: ', validationContext) // eslint-disable-line
    return validationContext.validate(form)
  }

  validateEmail() {
    // return: success, warning, error or null
    if(!this.state.showingFieldValidations) return null
    validationContext.validate({email: this.state.email})
    return validationContext.keyIsInvalid('email') ? 'error' : null
  }

  validatePassword() {
    // return: success, warning, error or null
    if(!this.state.showingFieldValidations) return null
    validationContext.validate({password: this.state.password})
    return validationContext.keyIsInvalid('password') ? 'error' : null
  }

  clearFieldErrors() {
    this.setState({
      error: undefined,
      showingFieldValidations: false,
    })
  }

  renderError() {
    if(this.state.error){
      return (
        <Alert bsStyle="danger" onDismiss={() => this.clearFieldErrors()}>
          <p className="error">{this.state.error}</p>
        </Alert>
      )}
  }


  onSubmit(e) {
    e.preventDefault()
    const email = this.state.email
    const password = this.state.password
    if(this.validateForm() == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      return
    }
    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        this.setState({ error: err.reason})
      } else {
        this.props.history.push('/') // eslint-disable-line
      }
    })
  }

  render() {
    if(Meteor.userId()) {
      return <Redirect to="/links" />
    }
    return (
      <div>
        <PageHeader>Login</PageHeader>

        { this.renderError() }

        {/* <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" name="email" ref={this.email} autoComplete="email" placeholder="eMail" />
          <input type="password" name="password" ref={this.password} autoComplete="new-password" placeholder="Password" />
          <button>Sign In</button>
        </form> */}


        <Form horizontal noValidate onSubmit={this.onSubmit}>

          <FormGroup controlId="email" validationState={this.validateEmail()}>
            <Col componentClass={ControlLabel} sm={2}>
      Email
            </Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              { validationContext.keyIsInvalid('email')
                ? <HelpBlock>Email must be a valid address, like: name@something.com</HelpBlock>
                : undefined
              }
            </Col>
          </FormGroup>

          <FormGroup controlId="password" validationState={this.validatePassword()}>
            <Col sm={2} componentClass={ControlLabel}>Password</Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
              { validationContext.keyIsInvalid('password')
                ? <HelpBlock>Password must be at least 4 characters long.</HelpBlock>
                : undefined
              }
            </Col>
          </FormGroup>

          <FormGroup controlId="fullName">
            <Col sm={2} componentClass={ControlLabel}>Real Name</Col>
            <Col sm={10}>
              <FormControl
                type="text"
                value={this.state.fullName}
                placeholder="What should we call you?"
                onChange={this.handleChange}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>


        <p>Need an account? <Link to="/signup">Sign up!</Link></p>
      </div>
    )
  }
}
