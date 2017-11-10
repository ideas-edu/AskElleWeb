Ext.require('Ext.ux.GroupedPanel');
Ext.require('Ext.data.Store');
Ext.require('Ext.layout.container.Accordion');

Ext.define
( 'FPT.view.helper.Strategies'
, { extend  : 'Ext.ux.GroupedPanel'
  , alias   : 'widget.strategies'
  , store   : 'Strategies'
  , titleColumn: 'description'
  , itemPanel: 'FPT.view.helper.Strategy'
  , layout  : { type: 'accordion' }
//  , makeItemData: function (x) { return x.data.hints; }
  , initComponent: function ()
    {
      this.addListener("add", this.strategyAdded);
      this.callParent(arguments);
    }
  , strategyAdded: function (list, ele, n)
    {
      // HAXX, couldn't get the first to expand without this timeout
      if(n == 0) setTimeout(function (x) { x.expand(); }, 50, ele);
      refreshLinks();
    }
  }
);
