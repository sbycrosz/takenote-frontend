import ajax from "appkit/utils/ajax";
import notif from "appkit/utils/notification";

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
        notif.success('Signed in succesfully');
      });
      promise.fail(function(reason){
        if (reason.status == 401) {
          notif.error('Wrong username/password');
        } else {
          notif.error('Error #' + reason.status);          
        }
      });
    }
  }
});

