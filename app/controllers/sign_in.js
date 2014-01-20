import ajax from "appkit/utils/ajax";

export default Ember.Controller.extend(
{
  init: function() {
    this._super();
    if (window.ENV.debug){
      this.set('username', 'sambya@aryasa.net');
      this.set('password', 'Password01');
    }
  },
  actions:{
    signIn: function(){
      var params = this.getProperties('username', 'password');
      var promise = ajax.post('/sign_in', params);
      promise.done(function(result){
      });
      promise.fail(function(reason){
      });
    }
  }
});

