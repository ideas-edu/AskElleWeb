Ext.require('Ext.panel.Panel');
Ext.require('Ext.tree.Panel');
Ext.require('Ext.data.TreeStore');

Ext.define
( 'FPT.view.exercises.List' 
, { extend  : 'Ext.tree.Panel'
  , alias   : 'widget.exerciselist'
  , store   : 'Exercises'
  , title   : 'All Exercises'
  , rootVisible: false
});
