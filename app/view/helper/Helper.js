Ext.require('Ext.panel.Panel');

Ext.define
( 'FPT.view.helper.Helper' 
, { extend  : 'Ext.panel.Panel'
  , alias   : 'widget.helper'
  , layout  : { type: 'vbox'
              , align: 'stretch' 
              }
  , bodyPadding: 3
  , items: 
      [ { xtype: 'button'
        , name:  'check'
        , id:    'check'
        , text:  'Check Progress'
        }
      , { xtype: 'textarea'
        , name:  'feedback'
        , readOnly: true
        , width: '100%'
        , height: 100
        , hidden: true
        }
      , { xtype: 'button'
        , name:  'more'
        , id:    'more'
        , text:  'More Help'
        , hidden: true
        }
      , { xtype: 'button'
        , name:  'previous'
        , id:    'previous'
        , text:  'Show previous hint'
        , hidden: true
        }
      , { xtype: 'panel'
        , border: false
        , hidden: true
        , layout: { type: 'vbox'
                  , align: 'stretch'
                  }
        , name: 'strategiesPanel'
        , id: 'strategiesPanel'
        , flex: 1
        , items:
            [ { xtype: 'panel'
              , html: "<center><h2>You can follow one of the following strategies:</h2></center>"
              , border: false
              , bodyPadding: "2 0 2 0"
              }
            , { xtype: 'strategies'
              , height: '100%'
              , width: '100%'
              , flex: 1
              }
            ]
        }
      ]
});
