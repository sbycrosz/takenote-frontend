var Ajax = function(){};

Ajax.get = function(path, params){
  return Ajax.authenticated_ajax('get', path, params);
};

Ajax.post = function(path, params){
  return Ajax.authenticated_ajax('post', path, params);
};

Ajax.put = function(path, params){
  return Ajax.authenticated_ajax('put', path, params);
};

Ajax.delete = function(path, params){
  return Ajax.authenticated_ajax('delete', path, params);
};

Ajax.authenticated_ajax = function(type, path, params){
  var env = window.ENV;
  return $.ajax({
    url: env.api_host + env.api_prefix + path,
    data: params,
    type: type,
    beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer '+ env.client_token);}
  });
};

export default Ajax;
