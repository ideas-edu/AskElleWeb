Ext.require('Ext.app.Controller');

Ext.define
( 'FPT.controller.Exercises'
, { extend: 'Ext.app.Controller'
  , views: ['exercises.List']
  , stores: ['Exercises']
  , controllers: ['Tutor']
  , refs: 
      [ { selector: 'exerciselist'
        , ref: 'exerciseList'
        }
      , { selector: '#fptutor'
        , ref: 'fptPanel'
        }
      , { selector: 'tutor'
        , ref: 'tutorPanel'
        }  
      ]
      
  , init: function() 
    {
      this.control({
            'exerciselist': {
                itemclick: this.loadExercise
            }
        });
    }
    
  , loadExercise : function(tree, item) {
        if (item.phantom) return;        
        this.getController('Tutor').loadExercise(item.data.id, item.data.description, item.data.name);        
        this.getExerciseList().collapse();
//        this.getTutorPanel().doLayout();
//        this.getFptPanel().doLayout();
    }
  
  , loadAllExercises: function () {
       this.getStore("Exercises").loadExerciseList();
       this.getExerciseList().setTitle("All Exercises");
    }
    
  , loadExerciseGroup: function (groupid) {
       this.getStore("Exercises").loadExerciseGroup(groupid);
       this.getExerciseList().setTitle("Group: " + groupid);
    }
  }
);
