export default Ember.TextArea.extend({
  didInsertElement: function() {
    var _this = $('#'+this.get('elementId'));
    _this.autosize();
    _this.focus();
  }
});