// Based http://stackoverflow.com/questions/17930456/ember-how-to-valuebind-tinymce-textarea-field-to-model
export default Ember.TextArea.extend({
  editor: null,
  _suspendValueChange: false,

  didInsertElement: function(){
    var id = "#" + this.get("elementId");        
    var view = this;
    window.tinymce.init({
      selector: id,
      autoresize_min_height: 400,
      autoresize_max_height: 800,
      plugins: ["autoresize autolink link image searchreplace"],
      toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
      menubar:false,
      statusbar: false,
      setup : function(ed) {                
        view.set("editor", ed);
        ed.on("keyup change", function() {
          view.suspendValueChange(function() {
          view.set("value", ed.getContent());
          });
        });
        ed.on("init", function(){
          ed.getBody().style.fontSize = "16px";
        });
      }
    });
  },

  suspendValueChange: function(cb) {
    this._suspendValueChange = true;
    cb();
    this._suspendValueChange = false;
  },

  valueChanged: function() {
    if (this._suspendValueChange) { return; }
    var content = this.get("value");
    this.get("editor").setContent(content);
  }.observes("value"),

  willClearRender: function() {        
    this.get("editor").remove();
  }
});
