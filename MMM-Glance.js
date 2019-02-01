/*********************************
  Magic Mirror Module:
  MMM-Glance
  By eouia

  MIT Licensed

*********************************/

Module.register("MMM-Glance", {


  defaults: {
    alias: {}
  },

  start: function() {
    this.status = {}
    this.alias = {}
    this.glancing = false
    this.defaultAlias = {
      "news" : "newsfeed",
      "weather" : "currentweather",
      "forecast" : "weatherforecast",
      "hello" : "helloworld",
      "test" : ["clock", "newsfeed"]
    }
  },

  getTranslations: function() {
    return {
      en: "translations/en.json",
    }
  },


  initialize: function() {
    console.log("Initialize Glance");
    var self = this
    MM.getModules().enumerate(function(m) {
      if(m.data.position) {
        self.alias[m.name] = m.name
      }
      })
    this.alias = Object.assign({}, this.alias, this.defaultAlias, this.config.alias)
  },

  glanceOn : function (call) {
    var filter = []
    var self = this

    if (Object.keys(this.alias).indexOf(call) >= 0) {
      var modules = this.alias[call]
      if (Array.isArray(modules)) {
        filter = modules
      } else {
        filter.push(modules)
      }
    } else {
      return false
    }

    if (!this.glancing) {
      MM.getModules().enumerate(function(m) {
        if (m.data.position) {
          self.status[m.name] = m.hidden
        }
      })
    }
    MM.getModules().enumerate(function(m) {
      if(Object.values(filter).indexOf(m.name) >= 0) {
        matched = 1
      }
    })


    if (matched == 0) {
      return false
    } else {
      MM.getModules().enumerate(function(m) {
        if (Object.values(filter).indexOf(m.name) >= 0) {
          m.show(0)
        } else {
          m.hide(0)
        }
      })
      this.glancing = true
      this.sendNotification('GLANCE_STARTED', {modules:filter, time:time})
      return true
    }
  },

  glanceOff: function() {
    this.glancing = false

    var self = this
    MM.getModules().enumerate(function(m) {
      if (typeof self.status[m.name] !== 'undefined') {
        if (self.status[m.name]) {
          m.hide(0)
        } else {
          m.show(0)
        }
      }
    })
    this.status = {}
    this.sendNotification('GLANCE_ENDED')
    return true;
  },

  notificationReceived: function(notification, payload, sender) {
    switch(notification) {
      case 'DOM_OBJECTS_CREATED':
        this.initialize()
        break
      case 'GLANCE_ON':
        this.glanceOn(payload.name)
        break
      case 'GLANCE_OFF':
        this.glanceOff()
        break
    }
  },
})
