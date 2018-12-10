import React from 'react'
import { Alert } from 'react-bootstrap'


export default class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      showingFieldValidations: false,
      fields: {},
      VC: {},
    }
  }

  handleChange(e) {
    let fields = this.state.fields
    fields[e.target.id] = e.target.value
    this.setState({ fields })
  }

  getValidationState(fieldId) {
    if(!this.state.showingFieldValidations) return null
    this.state.VC.validate({ [fieldId]: this.state.fields[fieldId]})
    return this.state.VC.keyIsInvalid(fieldId) ? 'error' : null
  }


  clearFieldErrors() {
    this.setState({
      error: undefined,
      showingFieldValidations: false,
    })
  }

  renderError() {
    if(this.state.error){
      return (
        <Alert bsStyle="danger" onDismiss={() => this.clearFieldErrors()}>
          <p className="error">{this.state.error}</p>
        </Alert>
      )}
  }

}
