import session from "appkit/models/session";

var Ajax = Ember.Object.extend({});

Ajax.reopenClass({
  get: function(path, params){
    return this.authenticated_ajax('get', path, params);
  },

  post: function(path, params){
    return this.authenticated_ajax('post', path, params);
  },

  put: function(path, params){
    return this.authenticated_ajax('put', path, params);
  },

  delete: function(path, params){
    return this.authenticated_ajax('delete', path, params);
  },

  authenticated_ajax: function(type, path, params){
    var accessToken = session.getToken();
    var env = window.ENV;
    var myRequest = $.ajax({
      url: env.api_host + env.api_prefix + path,
      data: params,
      type: type,
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+ accessToken);}
    });

    var wait = $.Deferred();
    setTimeout(function () { wait.resolve(); }, 300);
    return wait.then(function(){return myRequest;});
  }
});

export default Ajax;
