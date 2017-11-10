Ext.require('Ext.panel.Panel');

Ext.define
( 'FPT.view.helper.Steps'
, { extend  : 'Ext.ux.GroupedPanel'
  , alias   : 'widget.steps'
  , itemPanel: 'FPT.view.helper.Step'
  , layout: { type: 'vbox', align: 'stretch', autoSize: true }
  , border: false
  , makeItemData: function (r) { return r.content; }
  , initComponent: function ()
    {
      this.addListener("add", this.stepAdded);
      this.addListener("afterRender", refreshLinks);
      this.callParent(arguments);
    }
  , stepAdded: function (list, ele)
    {
      if(list.getComponent(0) == ele)
        ele.show();

      ele.addListener("expand", this.expandStep, list);
    }
  , expandStep: function (me)
    {
      if (me.nextSibling() != null)
        me.nextSibling().show();

      this.doLayout();
      this.ownerCt.doLayout();
    }
  }
);
