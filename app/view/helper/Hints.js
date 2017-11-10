Ext.require('Ext.panel.Panel');

Ext.define
( 'FPT.view.helper.Hints'
, { extend  : 'Ext.ux.GroupedPanel'
  , alias   : 'widget.hints'
  , itemPanel: 'FPT.view.helper.Hint'
  , layout: { type: 'card', align: 'stretch' }
  , bodyPadding: 2
  , lbar: [ { xtype: 'component', flex: 0.5 }
          , { xtype: 'button'
            , text: '&laquo;'
            , handler: function (me) {
                me.up('panel').getLayout().prev();
                me.up('panel').updateButtons();
              }
            , disabled: true
            }
          , { xtype: 'component', flex: 0.5 }
          ]
  , rbar: [ { xtype: 'component', flex: 0.5 }
          , { xtype: 'button'
            , text: '&raquo;'
            , handler: function (me) {
                me.up('panel').getLayout().next();
                me.up('panel').updateButtons();
              }
            , disabled: true
            }
          , { xtype: 'component', flex: 0.5 }
          ]
  , initComponent: function ()
    {
      this.callParent(arguments);
      setTimeout(function (x) { x.updateButtons(); }, 50, this);
      this.addListener("afterRender", refreshLinks);
    }
  , updateButtons: function ()
    {
      var layout = this.getLayout()
      this.getDockedItems().each
      ( function (v)
        {
          if(v.dock == "left")
            v.getComponent(1).setDisabled(!layout.getPrev());
          if(v.dock == "right")
            v.getComponent(1).setDisabled(!layout.getNext());
        }
      )
    }
  }
);
