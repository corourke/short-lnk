import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable */
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Nav, Navbar, NavDropdown, MenuItem, NavItem, PageHeader } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
/* eslint-enable */

export default class FormItem extends React.Component {
  render() {
    const { name, type, label, help, value, autoComplete, onChange, onValidate, placeholder} = this.props
    return (
      <FormGroup controlId={name} validationState={onValidate()}>
        <Col componentClass={ControlLabel} sm={2}>
          {label}
        </Col>
        <Col sm={9}>
          <FormControl
            type={type}
            placeholder={ placeholder || label }
            autoComplete={ autoComplete || 'on' }
            value={value}
            onChange={onChange()}
          />
          <FormControl.Feedback />
          { onValidate() && help
            ? <HelpBlock>{help}</HelpBlock>
            : undefined
          }
        </Col>
      </FormGroup>
    )
  }
}

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  value: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onValidate: PropTypes.func,
  placeholder: PropTypes.string,
}
