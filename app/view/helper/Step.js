Ext.require('Ext.panel.Panel');
Ext.require('Ext.Component');

Ext.define
( 'FPT.view.helper.Step'
, { extend  : 'Ext.panel.Panel'
  , alias   : 'widget.step'
  , border  : true
  , layout  : 'fit'
  , collapsible: true
  , collapsed: true
  , animCollapse: true
  , title: "More Help"
  , bodyPadding: 5
  , hidden: true
  , initComponent: function ()
    {
      this.callParent(arguments);
      this.add
        (Ext.create
          ( 'Ext.Component'
          , { html: "<pre>" + this.data + "</pre>"
            }
          )
        );
    }
});
