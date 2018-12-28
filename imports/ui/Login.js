import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

import { Button, Col, Form as FormLayout, FormGroup, PageHeader } from 'react-bootstrap'

import { validateUser, getValidationContext} from '../api/users'
import SimpleForm from './SimpleForm'
import FormItem from './FormItem'

export default class Login extends SimpleForm {
  constructor(props) {
    super(props)
    this.state.fields = {
      email: '',
      password: '',
    }
    this.state.VC = getValidationContext()
  }

  onSubmit(e) {
    e.preventDefault()
    if(validateUser(this.state.fields) == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      return
    }
    const {email, password} = this.state.fields
    Meteor.loginWithPassword(email, password, (err) => {
      if(err) {
        this.setState({ error: err.reason})
      } else {
        this.props.history.push('/links') // eslint-disable-line
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

        <FormLayout horizontal noValidate onSubmit={this.onSubmit.bind(this)}>

          <FormItem simpleForm={this} name="email" type="email" />

          <FormItem simpleForm={this} name="password" type="password"
            autoComplete="new-password"
          />

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </FormLayout>


        <p>Need an account? <Link to="/signup">Sign up!</Link></p>
      </div>
    )
  }
}
