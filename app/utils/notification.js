var Notification = Ember.Object.extend({});

Notification.reopenClass({
  success: function(message){
    this.showNotification('success', message);
  },

  error: function(message){
    this.showNotification('error', message);
  },

  info: function(message){
    this.showNotification('info', message);
  },

  showLoading: function(message){
    message = message || "Processing...";
    if (!this.isLoading){
      this.isLoading = true;
      this.loadingHUD = $.pnotify({
        text: message,
        type: 'info',
        nonblock: true,
        nonblock_opacity: 0.2,
        hide: false,
        styling: 'bootstrap3',
        history: false,
        icon: 'fa fa-cog fa-spin fa-lg'
      });
    } 
  },

  hideLoading: function(){
    if (this.isLoading){
      var loadingHUD = this.loadingHUD;
      loadingHUD.pnotify_remove();
      this.isLoading = false;
    }
  },

  showNotification: function(type, message){
    $.pnotify({
      text: message,
      type: type,
      nonblock: true,
      nonblock_opacity: 0.2,
      delay: 700, 
      styling: 'bootstrap3',
      history: false
    });
  }
});

export default Notification;
