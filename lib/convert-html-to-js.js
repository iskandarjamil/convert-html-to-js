var CompositeDisposable = require('event-kit').CompositeDisposable;

module.exports = {
  active: false,
  isActive: function() { return this.active; },
  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-to-javascript:convert-array': () => this.convertArray(),
      'html-to-javascript:convert-string': () => this.convertString(),

      'html-to-javascript:convert-array-double-quote': () => this.convertArrayDouble(),
      'html-to-javascript:convert-string-double-quote': () => this.convertStringDouble(),

      'html-to-javascript:convert-reverse': () => this.convertReverse(),
      'html-to-javascript:convert-reverse-double-quote': () => this.convertReverseDouble(),
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
        line = line.replace(/'/g, "\\'");
        output.push("'" + front_tab + line.trim() + "',");
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
		this.noitfyUser(output.join("\n"), 'Converted copied to clipboard.');
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
        line = line.replace(/'/g, "\\'");
        output.push("'" + front_tab + line.trim() + "'+");
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
		this.noitfyUser(output.join("\n"), 'Converted copied to clipboard.');
  },

	convertArrayDouble: function(text) {
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
        line = line.replace(/"/g, '\\"');
        output.push('"' + front_tab + line.trim() + '",');
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
		this.noitfyUser(output.join("\n"), 'Converted copied to clipboard.');
  },
  convertStringDouble: function(text) {
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
        line = line.replace(/"/g, '\\"');
        output.push('"' + front_tab+ line.trim() + '"+');
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
		this.noitfyUser(output.join("\n"), 'Converted copied to clipboard.');
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

				line = line.replace(/\\'/g, "'");
        line = line.trim().substr(1).slice(0, -2)
        // output.push(front_tab + line.trim());
        output.push(line);
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
  },
  convertReverseDouble: function(text) {
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

				line = line.replace(/\\"/g, '"');
        line = line.trim().substr(1).slice(0, -2)
        // output.push(front_tab + line.trim());
        output.push(line);
      }
    }
    catch(err) {
      console.log(err.message);
    }

    editor.insertText(output.join("\n"));
  },
	
	
	noitfyUser: function(clipped, text){
		atom.clipboard.write(clipped);
    atom.notifications.addSuccess(text);
	}
};
