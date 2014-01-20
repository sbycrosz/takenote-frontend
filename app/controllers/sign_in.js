import ajax from "appkit/utils/ajax";
import notif from "appkit/utils/notification";
import session from "appkit/utils/session_manager";

export default Ember.Controller.extend({
  init: function() {
    this._super();
    if (window.ENV.debug){
      this.set('username', 'sambya@aryasa.net');
      this.set('password', 'Password01');
    }
  },
  actions:{
    signIn: function(){
      var _this = this;
      var params = this.getProperties('username', 'password');
      var promise = ajax.post('/sign_in', params);
      promise.done(function(result){
        notif.success('Signed in succesfully');
        session.authenticate(result.access_token.token);
        _this.transitionToRoute('index');
      });
      promise.fail(function(reason){
        if (reason.status === 401) {
          notif.error('Wrong username/password');
        } else {
          notif.error('Error #' + reason.status);          
        }
      });
    }
  }
});

