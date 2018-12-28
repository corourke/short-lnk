import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'

export const Visits = new Mongo.Collection('visits')

export const schema = new SimpleSchema({
  _id: { type: String, min: 1 },
  visitedAt: { type: String },
})

const ValidationContext = schema.namedContext('visitsContext')

if (Meteor.isServer) {
  Meteor.publish('visits', function() {
    if(this.userId) {
      return Visits.find({})
    }
  })
}

Meteor.methods({
  'visits.insert'(visit) {
    ValidationContext.validate(visit)
    Visits.insert({
      _id: visit._id,
      visitedAt: visit.visitedAt,
    })
  },
})
