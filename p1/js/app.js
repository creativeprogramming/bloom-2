_.extend(Backbone.View.prototype, {

  parse: function(objName) {
     var self = this,
        _recurse_form = function(object, objName) {
          _.each(object, function(v,k) {
             if (v instanceof Object) {
                object[k] = _recurse_form(v, objName + '[' + k + '_attributes]');
             } else {
                object[k] = self.$('[name="'+ objName + '[' + k + ']"]').val();
             }
          });
          return object;
        };
     this.model.attributes = _recurse_form(this.model.attributes, objName);
  },

  populate: function(objName) {
     var self = this,
        _recurse_obj = function(object, objName) {
          _.each(object, function (v,k) {
             if (v instanceof Object) {
                _recurse_obj(v, objName + '[' + k + '_attributes]');
             } else if (_.isString(v)) {
                self.$('[name="' + objName + '[' + k + ']"]').val(v);
             }
          });
        };
     _recurse_obj(this.model.attributes, objName);
  }
});

var nametag = Backbone.Model.extend({
  defaults: {
     name: 'Fred Flintstone',
     role: 'Protagonist',
     saying: 'Yabba Dabba Do!',
     family: {
        name: 'Wilma Flintstone'
     }
  }
});

var nametagView = Backbone.View.extend({
  initialize: function() {
     _.bindAll(this);
  }
});

$(document).ready(function(){
  var myModel = new nametag();
  var myView = new nametagView({
     el: $('#nametagForm'),
     model: myModel
  });
  myView.populate('nametag');
  myView.parse('nametag');
});