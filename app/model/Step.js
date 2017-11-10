Ext.require('Ext.data.Model');

Ext.define('FPT.model.HintGroup', 
  { extend: 'Ext.data.Model'
  , fields: ['content']
  , belongsTo: 'Hint'
  }
);
