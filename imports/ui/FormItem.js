import React from 'react'
import PropTypes from 'prop-types'

/* eslint-disable */
import { Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Nav, Navbar, NavDropdown, MenuItem, NavItem, PageHeader } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
/* eslint-enable */

const initcap = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default class FormItem extends React.Component {
  render() {
    const { simpleForm, name, type, label, placeholder, autoComplete} = this.props
    const help = simpleForm.state.VC.keyErrorMessage(name)
    return (
      <FormGroup controlId={name} validationState={simpleForm.getValidationState(name)}>

        <Col componentClass={ControlLabel} sm={2}>
          {label || initcap(name)}
        </Col>

        <Col sm={9}>
          <FormControl
            type={type}
            placeholder={ placeholder || label || initcap(name) }
            autoComplete={ autoComplete || name || 'on' }
            value={simpleForm.state.fields[name]}
            onChange={simpleForm.handleChange.bind(simpleForm)}
          />
          <FormControl.Feedback />

          { simpleForm.getValidationState(name) && help
            ? <HelpBlock>{help}</HelpBlock>
            : undefined
          }
        </Col>
      </FormGroup>
    )
  }
}

FormItem.propTypes = {
  simpleForm: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
}
