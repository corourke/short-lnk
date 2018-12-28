import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import { setServerUserValidation } from '../imports/api/users'
import { Links } from '../imports/api/links'

import '../imports/startup/simple-schema-configuration.js'



Meteor.startup(() => {
  // code to run on server at startup
  setServerUserValidation()

  // Handler to check for existing links and redirect if one is found
  const redirectShortLinks = (req, res, next) => {
    const _id = req.url.slice(1)  // remove the initial slash
    const link = Links.findOne({ _id }) // check the DB for a link
    if(link) {
      res.statusCode = 302
      res.setHeader('Location', link.url)
      res.end()
      Meteor.call('links.trackVisit', _id)
    } else {
      next()
    }
  }

  WebApp.connectHandlers.use('/', redirectShortLinks )
})
