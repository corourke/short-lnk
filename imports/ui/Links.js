import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem, PageHeader } from 'react-bootstrap'



export default class Links extends React.Component {
  onSubmit(e) {
    e.preventDefault()
    Meteor.logout((err) => {
      if(err) {
        this.setState({ error: err.reason})
      } else {
        this.props.history.push('/') //
      }

    })
  }

  render() {
    if(Meteor.userId() == null) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <PageHeader>Sign Up</PageHeader>
        <Button type='button' onClick={this.onSubmit.bind(this)}>Log Out</Button>
      </div>
    )

  }
}
