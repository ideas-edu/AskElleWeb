Ext.require('Ext.app.Controller');

Ext.define
( 'FPT.controller.Helper'
, { extend: 'Ext.app.Controller'
  , views: ['helper.Hints', 'helper.Strategies', 'helper.Helper']
  , stores: ['Strategies']
  , models: ['Hint', 'Strategy']
  , refs: [ { selector: 'textfield[name=feedback]'
            , ref: 'feedbackField'
            }
          , { selector: '#check'
            , ref: 'checkButton'
            }
          , { selector: '#more'
            , ref: 'moreButton'
            }
          , { selector: '#previous'
            , ref: 'previousButton'
            }
          , { selector: 'editor'
            , ref: 'editor'
            }
          , { selector: 'strategies'
            , ref: 'strategies'
            }
          , { selector: '#strategiesPanel'
            , ref: 'strategiesPanel'
            }
          , { selector: 'helper'
            , ref: 'helper'
            }
          ]
  , init: function()
    {
      this.callParent(arguments);
      this.isProcessing=false;
      this.control
      (
        { 'editor':                { textchanged: this.reset }
        , 'button[name=check]':    { click: this.doCheck }
        , 'button[name=more]':     { click: this.doHints }
        , 'button[name=previous]': { click: this.doHints }
        }
      );
      var me = this;
      this.getStore("Strategies").on("datachanged", function() {me.getHelper().getEl().unmask(); me.isProcessing=false;})
    }
/* Checking current progress */
  , doCheck: function ()
    {
      if (this.isProcessing) return;
      this.isProcessing=true;
      var workExpression = getWorkField();
      var state = derivation.last();
      lastSubmittedText = workExpression;
      feedbacktextdeepService('submit', state, encodeURIComponent(workExpression), this.checkDone.bind(this));
      this.getHelper().getEl().mask("Checking...", "Checking");
    }
  , checkDone: function (result)
    {
      if (result.error != undefined)
        this.checkError(result.error);
      else
        this.checkOK(result);
      this.getHelper().getEl().unmask();
      this.isProcessing=false;
    }
  , checkError: function (error)
    {
      this.showFeedback(error);
      this.getPreviousButton().show();
    }
  , checkOK: function (result)
    {
      var state = arrayToState(result[2]);

      if (result[0])
        derivation.push(state);

      ready = result[3];
      if (ready)
        this.showFeedback("You have finished the exercise.");
      else
      {
        this.showFeedback(result[1]);
        if (result[0])
          this.getMoreButton().show();
        else
          this.getPreviousButton().show();
      }
    }

  , doHints: function ()
    {
      if (this.isProcessing) return;
      this.isProcessing=true;
      this.hideAll();
      this.getStore("Strategies").loadStrategies();
      this.getStrategiesPanel().show();
      this.getHelper().getEl().mask("Looking up hints..", "Hints");
    }

  , reset: function ()
    {
      this.hideAll();
      this.getCheckButton().show();
      this.isProcessing=false;
      this.getHelper().getEl().unmask();
    }

  , hideAll: function ()
    {
      this.getCheckButton().hide();
      this.getFeedbackField().setValue("");
      this.getFeedbackField().hide();
      this.getMoreButton().hide();
      this.getPreviousButton().hide();
      this.getStore("Strategies").removeAll();
      this.getStrategiesPanel().hide();
    }

 , showFeedback: function(feedback)
    {
      this.hideAll();
      this.getFeedbackField().setValue(descape(feedback));
      this.getFeedbackField().show();
    }
  }
);
