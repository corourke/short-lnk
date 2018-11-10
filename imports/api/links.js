import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Links = new Mongo.Collection('links')

export const schema = new SimpleSchema({
  url: {
    type: String,
    label: 'Link',
    regEx: SimpleSchema.RegEx.Url,
  },
  name: {
    type: String,
    min: 1,
    label: 'Link Name',
  }})

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
    validationContext.validate(link)
    Links.insert({userId: this.userId, url: link.url, name: link.name})

  },
})
