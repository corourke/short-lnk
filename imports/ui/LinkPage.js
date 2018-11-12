import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Alert, Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'

import FormItem from './FormItem'
import LinksList from './LinksList'

import { validationContext as VC } from '../api/links'


export default class LinkPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      showingFieldValidations: false,
      links: {},
      link: {
        name: '',
        url: '',
        shortlnk: '',
      },
    }
  }

  handleChange(e) {
    let link = this.state.link
    link[e.target.id] = e.target.value
    this.setState({ link })
  }

  // TODO: 'error' or null is needed by the FormGroup component
  // which is an implementation detail that should be pushed down to FormItem
  getValidationState(fieldId) {
    if(!this.state.showingFieldValidations) return null
    VC.validate({ [fieldId]: this.state.link[fieldId]})
    return VC.keyIsInvalid(fieldId) ? 'error' : null
  }


  onSubmit(e) {
    e.preventDefault()
    const { url, name } = this.state.link
    const link = { url, name }
    if(VC.validate(link) == false) {
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
        this.setState({ link: { name: '', url: '', shortlnk: '' }})
        this.clearFieldErrors()
      }
    })

  }

  clearFieldErrors() {
    this.setState({
      error: undefined,
      showingFieldValidations: false,
    })
  }

  // TODO: consolidate error handling into the App component if possible
  renderError() {
    if(this.state.error){
      return (
        <Alert bsStyle="danger" onDismiss={() => this.clearFieldErrors()}>
          <p className="error">{this.state.error}</p>
        </Alert>
      )}
  }

  render() {
    if(Meteor.userId() == null) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <PageHeader>Links</PageHeader>

        {this.renderError()}

        <LinksList />

        <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>
          <FormItem
            name="url" type="text" label="Link URL"
            placeholder="URL"
            help={VC.keyErrorMessage('url')}
            value={this.state.link.url}
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('url')}
          />
          <FormItem
            name="name" type="text" label="Link Name"
            placeholder="Name"
            help={VC.keyErrorMessage('name')}
            value={this.state.link.name}
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('name')}
          />
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">Add Link</Button>
            </Col>
          </FormGroup>

        </Form>
      </div>
    )

  }
}
