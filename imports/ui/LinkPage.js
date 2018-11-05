import React from 'react'
import { Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { Button, Col, Form, FormGroup, PageHeader } from 'react-bootstrap'
import FormItem from './FormItem'
import { Links } from '../api/links'



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

  // eslint-disable-next-line
  getValidationState(fieldId) {
    if(!this.state.showingFieldValidations) return null
    return null
    // userVC.validate({ [fieldId]: this.state.user[fieldId]})
    // return userVC.keyIsInvalid(fieldId) ? 'error' : null
  }


  onSubmit(e) {
    e.preventDefault()

    Links.insert({ url: this.state.link.url, name: this.state.link.name, shortlnk: '' })
    this.setState({ link: { name: '', url: '', shortlnk: '' }})

  }

  render() {
    if(Meteor.userId() == null) {
      return <Redirect to="/login" />
    }
    // { this.state.links.map((i) => {
    //   return <p key={i._id} >{i.url}</p>
    // })}
    return (
      <div>
        <PageHeader>Links</PageHeader>

        <div id="linksList">
        </div>

        <Form horizontal noValidate onSubmit={this.onSubmit.bind(this)}>
          <FormItem
            name="url" type="text" label="Link URL"
            help="Link must be a valid URL"
            placeholder="URL"
            value={this.state.link.url}
            onChange={() => this.handleChange.bind(this)}
            onValidate={() => this.getValidationState('url')}
          />
          <FormItem
            name="name" type="text" label="Link Name"
            placeholder="Name"
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
