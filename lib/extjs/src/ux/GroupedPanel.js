Ext.require('Ext.panel.Panel');
Ext.require('Ext.data.Model');
Ext.require('Ext.data.Store');

Ext.ns("Ext.ux");

Ext.define
('Ext.ux.GroupedPanel'
, { extend      : 'Ext.panel.Panel'
  , store       : null
  , data        : null
  , titleColumn : null
  , itemPanel   : 'Ext.panel.Panel'
  , makeItemData: function (x) { return x; }
  , initComponent: function() {
      this.callParent(arguments);
      this.store = Ext.data.StoreManager.lookup(this.store || 'ext-empty-store');
      if (this.store != undefined)
      {
        this.store.addListener('datachanged', this.makePanels, this);
        this.store.addListener('clear', this.makePanels, this);
      }
      this.makePanels();
    }
  , makePanels: function() {
      var me = this;
      me.removeAll();
      
      var panels = [];
      
      if (this.store != undefined)
      {
        this.store.each
        ( function (r)
          {
            var itemConf = { data: me.makeItemData(r) }
            if (me.titleColumn != null)
              itemConf.title = r.get(me.titleColumn);

            me.add(Ext.create(me.itemPanel, itemConf));
          }
        );
        //me.add(panels);
        return;
      }
      
      if (this.data != null)
      {
        this.data.each
        ( function (r)
          {
            var itemConf = { data: me.makeItemData(r) }
            if (me.titleColumn != null)
              itemConf.title = r[me.titleColumn];

            me.add(Ext.create(me.itemPanel, itemConf));
          }
        );
        //me.add(panels);
        return;
      }
      //this.doLayout();
//      me.add(panels);
    }
  }
);
