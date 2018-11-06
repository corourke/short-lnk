import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Links = new Mongo.Collection('links')

export const schema = new SimpleSchema({
  url: {
    type: String,
    label: 'Link URL',
    regEx: SimpleSchema.RegEx.Url,
  },
  name: String,
})

export const validationContext = schema.namedContext('linksContext')

if (Meteor.isServer) {
  Meteor.publish('links', function() {
    if(this.userId) {
      return Links.find({userId: this.userId})
    }
  })
}

Meteor.methods({
  'links.insert'(link) {

    if(!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in')
    }

    if(!link.url) {
      throw new Meteor.Error('missing-property', 'Link needs a url property')
    }

    validationContext.validate(link)
    if(!validationContext.isValid()) {
      throw new Meteor.Error('validation-error', `Validation error in field: ${validationContext.validationErrors()[0].name}`)
    }

    Links.insert({userId: this.userId, url: link.url, name: link.name})

  },
})
