import SessionManager from "appkit/models/session_manager";
import storage from "appkit/utils/storage";
import notif from "appkit/utils/notification";

export default Ember.Controller.extend({
  storage: storage,
  
  currentSessionBinding: Ember.Binding.oneWay("storage.currentSession"),
  currentUserBinding: Ember.Binding.oneWay("storage.currentUser"),

  isAuthenticated: Ember.computed.alias('currentSession.isAuthenticated'),

  actions: {    
    signOut: function() {
      var _this = this;
      notif.showLoading();
      SessionManager.deauthenticate().then(function(result){
        notif.hideLoading();
        _this.transitionToRoute('sign_in');
        notif.success('Logged Out Successfully');
      });
    }
  }
});

