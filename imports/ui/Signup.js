import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import { Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'

import { validateUser, getValidationContext} from '../api/users'
import SimpleForm from './SimpleForm'
import FormItem from './FormItem'

export default class Signup extends SimpleForm {
  constructor(props) {
    super(props)
    this.state.fields = {
      email: '',
      password: '',
      fullName: '',
    }
    this.state.VC = getValidationContext()
  }

  onSubmit(e) {
    e.preventDefault()
    // TODO: using validationContext here instead of method call
    if(validateUser(this.state.fields) == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      return
    }
    const {email, password,fullName} = this.state.fields
    Accounts.createUser({email, password, profile:{name: fullName}}, (err) => {
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
        <PageHeader>Sign Up</PageHeader>

        { this.renderError() }

        <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>

          <FormItem simpleForm={this} name="email" type="email" />
          <FormItem simpleForm={this} name="password" type="password" autoComplete="new-password" />
          <FormItem simpleForm={this} name="fullName" type="text"
            label="Real Name" placeholder="What should we call you?"
          />

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Sign in</Button>
            </Col>
          </FormGroup>
        </Form>

        <p>Already have an account? <Link to="/login">Log In!</Link></p>
      </div>
    )
  }
}
