Ext.require('Ext.panel.Panel');

Ext.define
( 'FPT.view.helper.Strategy'
, { extend  : 'Ext.panel.Panel'
  , alias   : 'widget.strategy'
  , layout: { type: 'vbox', align: 'stretch' }
  , initComponent: function ()
    {
      this.addListener("expand", this.after );
      this.callParent(arguments);
      this.add(Ext.create('FPT.view.helper.Hints', { data: this.data.data.hints, flex: 1 }));
    }
  , after: function ()
    {
      refreshLinks();
    }
  }
);
