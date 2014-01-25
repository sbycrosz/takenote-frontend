import session from "appkit/utils/session_manager";

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
    var wait = $.Deferred();
    setTimeout(function () { wait.resolve(); }, 500);

    var env = window.ENV;
    var myRequest = $.ajax({
      url: env.api_host + env.api_prefix + path,
      data: params,
      type: type,
      beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+ session.getToken());}
    });

    return wait.then(function(){return myRequest;});
  }
});

export default Ajax;
