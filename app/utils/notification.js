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
