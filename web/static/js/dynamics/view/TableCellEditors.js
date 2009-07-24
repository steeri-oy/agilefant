var TableEditors = {};
TableEditors.getEditorClassByName = function(name) {
  if(TableEditors[name]) {
    return TableEditors[name];
  }
  return null;
};
/**
 * 
 * @constructor
 */
TableEditors.CommonEditor = function() {
  
};
TableEditors.CommonEditor.prototype.init = function(row, cell, options) {
  this.options = options;
  this.cell = cell;
  this.row = row;
  this.model = row.getModel();
  this._registerEvents();
  this.setEditorValue();
  this.cell.hide();
};
/**
 * Save editor value if editor content is valid
 */
TableEditors.CommonEditor.prototype.save = function() {
  if(this.isValid() && this.element) {
    this.options.set.call(this.model, this.element.val());
    this.close();
  }
};
TableEditors.CommonEditor.prototype.close = function() {
  this.element.remove();
  if(this.error) {
    this.error.remove();
  }
  this.cell.editorClosing();
  //this.element = null;
};
TableEditors.CommonEditor.prototype.focus = function() {
  this.element.focus();
};
TableEditors.CommonEditor.prototype.isValid = function() {
  return true;
};
TableEditors.CommonEditor.prototype._registerEvents = function() {
  var me = this;
  this.element.keypress(function(event) {
    me._handleKeyEvent(event);
    return true;
  });
  this.element.blur(function(event) {
    me._handleBlurEvent(event);
  });
};
TableEditors.CommonEditor.prototype._handleBlurEvent = function(event) {
  this.save();
};
TableEditors.CommonEditor.prototype._handleKeyEvent = function(event) {
  if(event.keyCode === 27) {
    this.close();
  } else if(event.keyCode === 13) {
    this.save();
  }
};
TableEditors.CommonEditor.prototype.setEditorValue = function(value) {
  if(!value) {
    value = this.options.get.call(this.model);
  }
  this.element.val(value);
};

/**
 * 
 * @constructor
 * @base CommonEditor
 */
TableEditors.Text = function(row, cell, options) {
  this.element = $('<input type="text"/>').width("80%").appendTo(
      cell.getElement());
  this.init(row, cell, options);
};
TableEditors.Text.prototype = new TableEditors.CommonEditor();

/**
 * 
 * @constructor
 * @base CommonEditor
 */
TableEditors.SingleSelection = function(row, cell, options) {
  this.element = $('<select />').appendTo(cell.getElement());
  this.init(row, cell, options);
  this._renderOptions();
}

TableEditors.SingleSelection.prototype = new TableEditors.CommonEditor();

TableEditors.SingleSelection.prototype._renderOptions = function() {
  var me = this;
  var items = this.options.items;
  jQuery.each(items, function(key,val) {
    $('<option />').val(key).text(val).appendTo(me.element);
  });
};
/**
 * @constructor
 * @base CommonEditor
 */
TableEditors.Date = function(row, cell, options) {
  this.element = $('<input type="text"/>').width("80%").appendTo(
      cell.getElement());
  this.init(row, cell, options);
};
TableEditors.Date.prototype = new TableEditors.CommonEditor();

/**
 * @constructor
 * @base CommonEditor
 */
TableEditors.Estimate = function(row, cell, options) {
  this.element = $('<input type="text"/>').width("80%").appendTo(
      cell.getElement());
  this.init(row, cell, options);
};
TableEditors.Estimate.prototype = new TableEditors.CommonEditor();

/**
 * @constructor
 * @base CommonEditor
 */
TableEditors.Date = function(row, cell, options) {
  this.element = $('<input type="text"/>').width("80%").appendTo(
      cell.getElement());
  this.init(row, cell, options);
};
TableEditors.Date.prototype = new TableEditors.CommonEditor();

/**
 * @constructor
 * @base CommonEditor
 */

TableEditors.Wysiwyg = function(row, cell, options) {
  this.actualElement = $('<textarea></textarea>').appendTo(cell.getElement());
  this.actualElement.width("98%").height("240px");
  setUpWysiwyg(this.actualElement);
  this.element = $(this.actualElement.wysiwyg("getDocument"));
  this.init(row, cell, options);
};
TableEditors.Wysiwyg.prototype = new TableEditors.CommonEditor();

TableEditors.Wysiwyg.prototype.setEditorValue = function(value) {
  if(!value) {
    value = this.options.get.call(this.model);
  }
  this.actualElement.wysiwyg("setValue",value);
};

TableEditors.Wysiwyg.prototype.save = function() {
  if(this.isValid() && this.element) {
    var value = this.actualElement.val();
    this.options.set.call(this.model, value);
    this.close();
  }
};

TableEditors.Wysiwyg.prototype.close = function() {
  this.element = null;
  this.actualElement.wysiwyg("remove");
  this.actualElement.remove();
  this.cell.editorClosing();
};

/**
 * @constructor
 * @base CommonEditor
 */
TableEditors.User = function(row, cell, options) {
  this.init(row, cell, options);
};
TableEditors.User.prototype = new TableEditors.CommonEditor();



