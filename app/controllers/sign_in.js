import SessionManager from "appkit/models/session_manager";
import notif from "appkit/utils/notification";
import User from "appkit/models/user";

export default Ember.Controller.extend({
  init: function() {
    this._super();
    if (window.ENV.debug){
      this.set('username', 'sambya@aryasa.net');
      this.set('password', 'Password01');
    }
  },

  clearForm: function(){
    this.set('username', null);
    this.set('password', null);
  },
  
  actions:{
    signIn: function(){
      var _this = this;
      var params = this.getProperties('username', 'password');
      
      notif.showLoading();  
      SessionManager.authenticate(params).then(function(result){
        notif.hideLoading();
        _this.clearForm();
        _this.transitionToRoute('first');
        notif.success('Signed in succesfully');
      }, function(reason){
        notif.hideLoading();
        if (reason.status === 401) {
          notif.error('Wrong username/password');
        } else {
          notif.error('Error #' + reason.status);          
        }
      });
    },

    guestSignIn: function(){
      var _this = this;

      notif.showLoading();      
      User.guestSignIn().then(function(result){
        notif.hideLoading();
        _this.clearForm();
        _this.transitionToRoute('first');
        notif.success('Signed up succesfully');

      },function(reason){
        notif.hideLoading();
      });
    }
  }
});

