var CompositeDisposable = require('event-kit').CompositeDisposable;

module.exports = {
  active: false,
  isActive: function() { return this.active; },
  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'jen-html-to-javascript:convert-array': () => this.convertArray(),
      'jen-html-to-javascript:convert-string': () => this.convertString(),

      'jen-html-to-javascript:convert-array-reverse': () => this.convertReverse(),
      'jen-html-to-javascript:convert-string-reverse': () => this.convertReverse(),
    }));
  },
  deactivate: function() {

  },
  activatePlugin: function() {
    if (this.active) return;

    this.active = true;
  },
  deactivatePlugin: function() {
    if (!this.active) return;
    this.active = false;
    this.subscriptions.dispose();
  },
  convertArray: function(text) {
    var editor    = atom.workspace.getActiveTextEditor();
    var selection = (text)?text:editor.getSelectedText();
    var lines = selection.split("\n");

    if (!!!selection.trim()) return;

    output = [];
    try {
      for (var i=0; i<lines.length; i++) {
        var line = lines[i];

        whitespace = line.search(/\S|$/);
        var front_tab = '';
        if (whitespace){
          for (var j = 0; j < whitespace; j++) {
            front_tab += " ";
          }
        }
        output.push(front_tab + "'" + line.trim() + "',");
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
  },
  convertString: function(text) {
    var editor    = atom.workspace.getActiveTextEditor();
    var selection = (text)?text:editor.getSelectedText();
    var lines = selection.split("\n");

    if (!!!selection.trim()) return;

    output = [];
    try {
      for (var i=0; i<lines.length; i++) {
        var line = lines[i];

        whitespace = line.search(/\S|$/);
        var front_tab = '';
        if (whitespace){
          for (var j = 0; j < whitespace; j++) {
            front_tab += " ";
          }
        }
        output.push(front_tab + "'" + line.trim() + "'+");
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
  },
  convertReverse: function(text) {
    var editor    = atom.workspace.getActiveTextEditor();
    var selection = (text)?text:editor.getSelectedText();
    var lines = selection.split("\n");

    if (!!!selection.trim()) return;

    output = [];
    try {
      for (var i=0; i<lines.length; i++) {
        var line = lines[i];

        whitespace = line.search(/\S|$/);
        var front_tab = '';
        if (whitespace){
          for (var j = 0; j < whitespace; j++) {
            front_tab += " ";
          }
        }

        line = line.trim().substr(1).slice(0, -2)
        output.push(front_tab + line.trim());
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
  },
};
