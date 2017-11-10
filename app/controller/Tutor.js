Ext.require('Ext.app.Controller');

Ext.define
( 'FPT.controller.Tutor'
, { extend: 'Ext.app.Controller'
  , views: ['Tutor', 'Editor', 'helper.Helper', 'External']
  , controllers: ['Helper']
  , refs: 
      [ { selector: 'editor > editorArea'
        , ref: 'editorArea'
        }
      , { selector: '#description'
        , ref: 'description'
        }
      , { selector: '#descriptionArea'
        , ref: 'descriptionArea'
        }
      , { selector: 'tutor'
        , ref: 'tutorPanel'
        }
      , { selector: '#helperPanel'
        , ref: 'helperPanel'
        }
      , { selector: 'helper'
        , ref: 'helper'
        }
      , { selector: '#fptutor'
        , ref: 'fptPanel'
        }
      , { selector: 'textfield[name=feedback]'
        , ref: 'feedbackField'
        }
      ]
  , loadExercise: function (ex, desc, name)
    {
      exerciseid = ex;
      this.getDescriptionArea().setValue(desc.replace(/\\\\/g, "\n"));
      this.getDescription().expand();
      this.getTutorPanel().enable();
      this.getHelperPanel().enable();     
      this.getController('Helper').reset();
      this.initExercise();
    }
    
  , initExercise: function ()
    {
      function callback(state) {
        derivation = [];
        fillWorkField(state.term);
        derivation.push(state);        
      }

      generateService('tutor', "Medium", callback.bind(this));
    }
/*  , doBack : function ()
    {   
      if (derivation.length > 1  ) {
        if (lastSubmittedText == getWorkField()) {
          derivation.pop();
          fillWorkField(derivation.last().term);
        } else {
          fillWorkField(lastSubmittedText);
        }
      }
      this.getFeedbackField().setValue("Reverted.");
    }*/
  }
);
