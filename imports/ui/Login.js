import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

/* eslint-disable */
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Nav, Navbar, NavDropdown, MenuItem, NavItem, PageHeader } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
/* eslint-enable */

import { validateUser, ValidationContext as VC} from '../api/users'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      showingFieldValidations: false,
      user: {
        email: '',
        password: '',
      },
    }
  }

  handleChange(e) {
    let user = this.state.user
    user[e.target.id] = e.target.value
    this.setState({ user })
  }

  getValidationState(fieldId) {
    if(!this.state.showingFieldValidations) return null
    VC.validate({ [fieldId]: this.state.user[fieldId]})
    return VC.keyIsInvalid(fieldId) ? 'error' : null
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
    if(validateUser(this.state.user) == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      return
    }
    const {email, password} = this.state.user
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

        <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>

          <FormGroup controlId="email" validationState={this.getValidationState('email')}>
            <Col componentClass={ControlLabel} sm={2}>Email</Col>
            <Col sm={10}>
              <FormControl
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={this.state.user.email}
                onChange={this.handleChange.bind(this)}
              />
              <FormControl.Feedback />
              { this.getValidationState('email')
                ? <HelpBlock>Email must be a valid address, like: name@something.com</HelpBlock>
                : undefined
              }
            </Col>
          </FormGroup>

          <FormGroup controlId="password" validationState={this.getValidationState('password')}>
            <Col sm={2} componentClass={ControlLabel}>Password</Col>
            <Col sm={10}>
              <FormControl
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                value={this.state.user.password}
                onChange={this.handleChange.bind(this)}
              />
              <FormControl.Feedback />
              { this.getValidationState('password')
                ? <HelpBlock>{VC.keyErrorMessage('password')}</HelpBlock>
                : undefined
              }
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
