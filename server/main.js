import { Meteor } from 'meteor/meteor'
import { WebApp } from 'meteor/webapp'

import { setServerUserValidation } from '../imports/api/users'
import { Links } from '../imports/api/links'

import '../imports/startup/simple-schema-configuration.js'



Meteor.startup(() => {
  // code to run on server at startup
  setServerUserValidation()

  const redirectShortLinks = (req, res, next) => {
    const _id = req.url.slice(1)  // remove the initial slash
    const link = Links.findOne({ _id }) // check the DB for a link
    if(link) {
      res.statusCode = 302
      res.setHeader('Location', link.url)
      res.end()
    } else {
      next()
    }
  }

  WebApp.connectHandlers.use('/', redirectShortLinks )
})
