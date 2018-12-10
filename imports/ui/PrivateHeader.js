import React from 'react'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button, Nav, Navbar, NavItem, PageHeader} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


class PrivateHeader extends React.Component {

  // TODO: This menu bar doesn't really make sense for this application

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>Short-Lnk</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav bsStyle="pills" activeKey={2}>
              <LinkContainer to="/links">
                <NavItem eventKey={1}>
          Links
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem eventKey={2}>
          Login
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/signup">
                <NavItem eventKey={3}>
          Signup
                </NavItem>
              </LinkContainer>
            </Nav>

            <Navbar.Form pullRight style={{paddingRight: '0px'}}>
              <Button onClick={ () => Meteor.logout(() => this.history.push('/login')) }>
              Log Out
              </Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <PageHeader>{this.props.children}</PageHeader>
      </div>
    )
  }
}

// TODO: Add propthypes

export default withRouter(PrivateHeader)
