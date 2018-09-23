import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button, Nav, Navbar, NavDropdown, MenuItem, NavItem } from 'react-bootstrap'



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
      <div className="wrapper">
        <h1>Links</h1>
        <div className="container">
          <button className="button" onClick={this.onSubmit.bind(this)}>Log Out</button>
        </div>
      </div>)

  }
}
