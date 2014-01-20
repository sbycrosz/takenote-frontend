var Notification = function(){};

Notification.success = function(message){
  Notification.showNotification('success', message);
};

Notification.error = function(message){
  Notification.showNotification('error', message);
};

Notification.info = function(message){
  Notification.showNotification('info', message);
};

Notification.showNotification = function(type, message){
  $.pnotify({
    text: message,
    type: type,
    nonblock: true,
    nonblock_opacity: 0.2,
    delay: 700, 
    styling: 'bootstrap3',
    history: false
  });
};

export default Notification;
