import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Alert, Button, Col, Form, FormGroup } from 'react-bootstrap'

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
  }

  onSubmit(e) {
    e.preventDefault()
    const { url, name } = this.state.fields
    const link = { url, name }
    if(this.state.VC.validate(link) == false) {
      this.setState({
        error: 'Please correct the invalid fields below',
        showingFieldValidations: true,
      })
      return
    }
    Meteor.call('links.insert', link, (err) => {
      if(err) {
        this.setState({ error: err.message })
      } else {
        this.setState({ fields: { name: '', url: '', shortlnk: '' }})
        this.clearFieldErrors()
      }
    })

  }

  render() {
    return (
      <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>

        { this.renderError() }
        
        <FormItem
          name="url" type="text" label="Link URL"
          placeholder="URL"
          help={this.state.VC.keyErrorMessage('url')}
          value={this.state.fields.url}
          onChange={() => this.handleChange.bind(this)}
          onValidate={() => this.getValidationState('url')}
        />
        <FormItem
          name="name" type="text" label="Link Name"
          placeholder="Name"
          help={this.state.VC.keyErrorMessage('name')}
          value={this.state.fields.name}
          onChange={() => this.handleChange.bind(this)}
          onValidate={() => this.getValidationState('name')}
        />
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Add Link</Button>
          </Col>
        </FormGroup>

      </Form>
    )
  }
}
