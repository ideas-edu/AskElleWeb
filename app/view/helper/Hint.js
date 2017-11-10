Ext.require('Ext.panel.Panel');
Ext.require('Ext.util.TextMetrics');

Ext.define
( 'FPT.view.helper.Hint'
, { extend  : 'Ext.panel.Panel'
  , alias   : 'widget.hint'
  , layout: { type: 'vbox', align: 'stretch', autoSize: true }
  , border: false
  , bodyCls: "scrollable"
  , initComponent: function ()
    {
      this.callParent(arguments);

      var me = this;

      var elMetrics = new Ext.util.TextMetrics(this.getEl());
      elMetrics.setFixedWidth(322);

      if(this.data.description != undefined && this.data.description != "")
        this.add(Ext.create
            ( 'Ext.panel.Panel'
            , { title: "Explanation"
              , layout: { type: 'vbox', align: 'stretch' }
              , bodyPadding: 5
              , height: elMetrics.getHeight(this.data.description) + 10 + 27
              , items: { xtype: 'component', html: this.data.description, border: false }
              }
            ));

      if(this.data.hint != undefined && this.data.hint != "")
      {
        this.add(Ext.create
            ( 'Ext.panel.Panel'
            , { title: "Hint"
              , layout: { type: 'vbox', align: 'stretch' }
              , bodyPadding: 5
              , height: elMetrics.getHeight(this.data.hint) + 10 + 27
              , items: { xtype: 'component', html: this.data.hint, border: false }
              }
            ));
      }

      this.add(Ext.create('FPT.view.helper.Steps', { data: this.data.steps }));
      this.addListener("afterRender", refreshLinks);
    }
  }
);
