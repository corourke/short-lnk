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
          <FormItem
            name="email" type="email" autoComplete="email" label="Email"
            help={this.state.VC.keyErrorMessage('email')}
            value={this.state.fields.email}
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('email')}
          />

          <FormItem
            name="password" type="password" autoComplete="new-password" label="Password"
            help={this.state.VC.keyErrorMessage('password')}
            value={this.state.fields.password}
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('password')}
          />

          <FormItem
            name="fullName" type="text" label="Real Name"
            help={this.state.VC.keyErrorMessage('fullName')}
            value={this.state.fields.fullName}
            placeholder="What should we call you?"
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('fullName')}
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
