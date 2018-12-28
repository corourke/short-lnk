import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Button, Col, Form, FormGroup, Modal } from 'react-bootstrap'

import { getValidationContext } from '../api/links'
import SimpleForm from './SimpleForm'
import FormItem from './FormItem'



export default class LinkForm extends SimpleForm {
  constructor(props) {
    super(props)
    this.state.fields = {
      name: '',
      url: '',
      shortlnk: '',
    }
    this.state.VC = getValidationContext()
    this.state.show = false
  }

  onSubmit(e) {
    e.preventDefault()
    const { url, name } = this.state.fields
    const link = { url, name }
    if(this.state.VC.validate(link, { keys: ['url', 'name']}) == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      console.log('Form Errors: ', this.state.VC.validationErrors())
      return
    }
    Meteor.call('links.insert', link, (err) => {
      if(err) {
        this.setState({ error: err.message })
      } else {
        this.setState({ fields: { name: '', url: '', shortlnk: '' }})
        this.handleClose()
      }
    })

  }

  handleClose() {
    this.setState({ show: false })
    this.clearFieldErrors()
  }

  handleShow() {
    this.setState({ show: true })
  }

  render() {
    return (
      <div>
        <p>
          <Button bsStyle="primary" onClick={this.handleShow.bind(this)}>
            Add Link
          </Button>
        </p>

        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
          <Modal.Header>
            <Modal.Title>Add Link</Modal.Title>
          </Modal.Header>
          <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>
            <Modal.Body>

              { this.renderError() }

              <FormItem
                simpleForm={this} name="url" type="text" label="Link URL" placeholder="URL"
              />
              <FormItem
                simpleForm={this} name="name" type="text" label="Link Name" placeholder="Name"
              />

            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleClose.bind(this)}>Close</Button>
              <Button type="submit">Add Link</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>

    )
  }
}
