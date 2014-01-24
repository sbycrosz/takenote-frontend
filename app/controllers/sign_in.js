import ajax from "appkit/utils/ajax";
import notif from "appkit/utils/notification";

export default Ember.Controller.extend({
  needs: "application",

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
      ajax.post('/sign_in', params).then(function(result){
        notif.hideLoading();
        
        notif.success('Signed in succesfully');
        var appController = _this.get('controllers.application');
        appController.setSession(result);
        
        _this.clearForm();
        _this.transitionToRoute('index');
      }, function(reason){
        notif.hideLoading();

        if (reason.status === 401) {
          notif.error('Wrong username/password');
        } else {
          notif.error('Error #' + reason.status);          
        }
      });
    }
  }
});

