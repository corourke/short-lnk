import React from 'react'
import { Meteor } from 'meteor/meteor'
import { Button, Panel } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import Clipboard from 'clipboard'

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      justCopied: false,
    }
  }
  componentDidMount() {
    this.clipboard = new Clipboard('#Panel' + this.props._id + ' #copyBtn')

    this.clipboard.on('success', () => {
      this.setState({ justCopied: true})
      setTimeout(() => this.setState({ justCopied: false}), 1000)
    })
      .on('error', () => {
        alert('Unable to copy. Please copy the link manually.')
      })
  }
  componentWillUnmount() {
    this.clipboard.destroy()
  }
  render() {
    return(
      <Panel id={'Panel' + this.props._id} key={this.props._id} className='link'>
        <Panel.Body>
          <h3>{this.props.name}</h3>
          <p><a href={this.props._id}>{Meteor.absoluteUrl(this.props._id)}</a></p>
          <p className="bs-component">
            <Button bsStyle="primary">Visit</Button>
            <Button id="copyBtn" bsStyle="link" data-clipboard-text={Meteor.absoluteUrl(this.props._id)}>
              { this.state.justCopied ? 'Copied' : 'Copy' }
            </Button>
            <Button bsStyle="link" onClick={() => {
              Meteor.call('links.setVisibility', this.props._id, !this.props.visible)
            } } >
              { this.props.visible ? 'Hide' : 'Unhide' }
            </Button>
          </p>
        </Panel.Body>
      </Panel>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
}
