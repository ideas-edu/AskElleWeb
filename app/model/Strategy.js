Ext.require('Ext.data.Model');

Ext.define('FPT.model.Strategy', 
  { extend: 'Ext.data.Model'
  , fields: ['description']
  , hasMany: 'Hint'
  }
);
