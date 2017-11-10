Ext.require('Ext.data.TreeStore');

Ext.define('FPT.store.Exercises', { 
  extend: 'Ext.data.TreeStore', 
  model: 'FPT.model.Exercise',
  root: {}, 
  constructor: function () {
      this.callParent(arguments);
    }, 
  loadExerciseList: function () {
      exerciseListService('init', this.initExerciseList.bind(this));
    },
  loadExerciseGroup: function (groupid) {
      groupListService(groupid, 'init', this.initExerciseList.bind(this));
    },
  initExerciseList: function (exs) {
      for (var i = 0; i < exs.length; i++)
        this.addExercise(exs[i]);
    },
  addExercise: function (es) {
      var id      = es.exerciseid;
      var idparts = id.split(".");
      var desc    = es.description;
      var curnode = this.getRootNode();
     
      for (var i = 0; i < idparts.length - 1; i++) {
         if (!curnode.findChild('text',idparts[i]))
            curnode.appendChild({text: idparts[i], expanded: true});
          
          curnode=curnode.findChild('text', idparts[i]);
      }

      curnode.appendChild({
        id: id, 
        description: desc, 
        name: idparts[i],
        status: es.status,
        
        text: idparts[i],
        qtip: descapeDesc(desc).replace(/\"/g, "&#34;"),
        leaf: true });
    }
  }
);
