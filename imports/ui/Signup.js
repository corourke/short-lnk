import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'

export default class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
    }
    this.email = React.createRef()
    this.password = React.createRef()
  }

  onSubmit(e) {
    e.preventDefault()
    const email = this.email.current.value
    const password = this.password.current.value
    Accounts.createUser({email, password}, (err) => {
      if(err) {
        this.setState({ error: err.reason})
      } else {
        this.props.history.push('/') //
      }
    })
  }

  render() {
    if(Meteor.userId()) {
      return <Redirect to="/links" />
    }
    return (
      <div>
        <h1>Signup</h1>

        { this.state.error ? <p>{this.state.error}</p> : undefined }

        <form noValidate onSubmit={this.onSubmit.bind(this)}>
          <input type="email" name="email" ref={this.email} autoComplete="email" placeholder="eMail" />
          <input type="password" name="password" ref={this.password} autoComplete="new-password" placeholder="Password" />
          <button>Create Account</button>
        </form>
        <p>Already have an account? <Link to="/login">Log In!</Link></p>
      </div>
    )
  }
}
