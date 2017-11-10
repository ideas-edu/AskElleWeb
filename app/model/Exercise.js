Ext.require('Ext.data.Model');

Ext.define('FPT.model.Exercise', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'description', 'status']
});
