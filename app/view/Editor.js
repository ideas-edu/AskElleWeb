Ext.require("Ext.panel.Panel");
Ext.require("Ext.form.field.TextArea");

Ext.define
( "FPT.view.Editor"
, { extend: "Ext.panel.Panel"
  , alias: "widget.editor"
  , title: "Editor"
  , layout: 'fit'
  , items: 
    [ { xtype: 'textareafield'
      , name:  'editorArea'
      , inputId: 'editorArea'
      , layout: 'fit'
      }
    ]
  , initComponent: function ()
    {
      this.callParent(arguments);
      this.on('afterrender', this.makeEditor, this, { single: true });
      this.on('afterlayout', this.resizeEditor);
    }
  , makeEditor: function ()
    {
      var me = this;
      
      var uiOptions = { path : 'lib/codemirror-ui/js/', searchMode : 'popup', buttons: []}
      var codeMirrorOptions = { mode:          "haskell"
                              , lineNumbers:   true
                              , matchBrackets: true
                              , theme:         "elegant"
                              , indentUnit:    3
                              , tabMode:       "shift"
                              , textWrapping:  false
                              , enterMode:     "keep"
                              , height:        "100%"
                              , minHeight:     "5"
                              , onKeyEvent:      function () { me.textChanged(arguments); }
                              }

      editor = new CodeMirrorUI(document.getElementById('editorArea'), uiOptions, codeMirrorOptions);
    }
  , resizeEditor: function (container)
    {
      editor.mirror.getWrapperElement().style.height = container.body.dom.offsetHeight + "px"; //minus the size of the toolbar
      editor.mirror.refresh();
    }
  , textChanged: function (inst, ch)
    {
      this.fireEvent('textchanged', inst, ch);
    }
  }
);
