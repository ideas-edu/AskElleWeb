Ext.require('Ext.panel.Panel');
Ext.require('Ext.form.field.TextArea');
Ext.require('Ext.button.Button');

Ext.define
( 'FPT.view.Tutor' 
, { extend  : 'Ext.panel.Panel'
  , alias   : 'widget.tutor'
  , layout  : { type: 'border'
              , align: 'stretch'
              }
  , border: false
  , items: 
      [ { xtype: 'panel'
        , layout: 'fit'
        , height: 200
        , margins: '0 0 4 0'
        , collapsible: true
        , animCollapse: true
        , region: 'north'
        , name: 'description'
        , id: 'description'
        , items: 
            { xtype: 'textareafield'
            , layout: 'fit'
            , name:  'descriptionArea'
            , id:    'descriptionArea'
            , readOnly: true
            }
        , title: "Description"
        }
      , { xtype: 'editor'
        , layout: 'fit'
        , region: 'center'
        }
      ]
  }
);
