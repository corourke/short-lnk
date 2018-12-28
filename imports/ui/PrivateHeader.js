import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button, Nav, Navbar, NavItem, PageHeader} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


class PrivateHeader extends React.Component {

  // TODO: This menu bar doesn't really make sense for this application
  renderMenu() {
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
  }

  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>Short-Lnk</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Form pullRight style={{paddingRight: '0px'}}>
            <Button onClick={ () => Meteor.logout(() => this.props.history.push('/login')) }>
              Log Out
            </Button>
          </Navbar.Form>

        </Navbar>

        <PageHeader>{this.props.children}</PageHeader>
      </div>
    )
  }
}

export default withRouter(PrivateHeader)

PrivateHeader.propTypes = {
  history: PropTypes.object.isRequired,
  children: PropTypes.node,
}
