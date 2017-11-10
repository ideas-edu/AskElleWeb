Ext.require('Ext.window.Window');
Ext.require('Ext.form.Panel');

Ext.define('FPT.view.External', 
  { extend: 'Ext.window.Window'
  , alias : 'widget.external'

  , width : 960
  , height: 600
  , layout: 'fit'

  , closable: true
  , modal: true
  , items:
      [{ xtype  : "component"
       , id     : "external-win"
       , autoEl :
          { tag : "iframe"
          }
       }
      ]
  , bodyPadding: "5 5 5 5"
  , showUrl: function (str)
    {
      this.show();
      Ext.getDom('external-win').src = str;
    }
  }
);
