
"use strict";
APP.NoteEditView = Backbone.View.extend({
  // functions to fire on events
  events: {
    "click button.save": "save"
  },

  // the template
  template: _.template($('#formTemplate').html()),

  initialize: function (options) {
    this.model.bind('invalid', APP.helpers.showErrors, APP.helpers);
    this.model.bind('invalid', this.invalid, this);
  },

  invalid: function () {
    this.$el.find('a.cancel').hide();
  },

  save: function (event) {
    event.stopPropagation();
    event.preventDefault();

    // update our model with values from the form
    this.model.set({
      title: this.$el.find('input[name=title]').val(),
      eventType: this.$el.find('input[name=eventType]').val(),
      author: this.$el.find('input[name=author]').val(),
      eventStartDate: this.$el.find('input[name=eventStartDate]').val(),
      eventEndDate: this.$el.find('input[name=eventEndDate]').val(),
      guestList: this.$el.find('input[name=guestList]').val(),
      location: this.$el.find('input[name=location]').val(),
      description: this.$el.find('textarea[name=description]').val()
    });

    if (this.model.isValid()) {
      this.model.save();
      // redirect back to the index
      Backbone.history.navigate('notes/index', {trigger: true});
    }
  },

  // populate the html to the dom
  render: function () {
    this.$el.html(
      this.template(this.model.toJSON())
    );
    return this;
  }
});
