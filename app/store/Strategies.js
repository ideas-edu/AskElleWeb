Ext.require('Ext.data.Store');

Ext.define
( 'FPT.store.Strategies'
, { extend: 'Ext.data.Store'
  , model: 'FPT.model.Strategy'
  , sorters: [ { property: 'description'
               , direction: 'ASC'
               } 
             ]
  , constructor: function () 
    {
      this.callParent(arguments);
    }
  , loadStrategies: function ()
    {
      var state = derivation.last();
      this.removeAll();
      allhintsService('loadStrategies', state, this.strategiesLoaded.bind(this));
    }
  , strategiesLoaded: function(items)
    {
      var dat = [];

      if(typeof items == "object") //Catch the case where there are no strategies
        var subForest = items.Tree[2];
        for (i = 0; i < subForest.length; i++)
          dat.push(
             { description: descapeDesc(subForest[i].Tree[0]) // AG: should add accessor functions for these
             , hints: this.parseHints([], subForest[i].Tree[2])
             });

      this.add(dat);
    }
  , parseHints: function (descs, data)
    {
        var hints = new Array();
        
        for (var i = 0; i < data.length; i++) {
            if (data[i].Tree[1] == "label") {
                var x = this.parseHints(descs.concat(descapeDesc(data[i].Tree[0])), data[i].Tree[2]);
                hints = hints.concat(x);
            } else if (data[i].Tree[1] == "hint") {
                hints.push
                ({ description: descs.join("<br/><br/>"),
                   hint:        descapeHint(data[i].Tree[0]),
                   steps:       this.parseSteps(data[i].Tree[2])
                 });
            }
        }
        return hints;
    }
  , parseSteps: function (data)
    {
      steps = []

      while ( data.length != 0 ) {
          steps.push({ content: descapeHint(data[0].Tree[0]) });
          data = data[0].Tree[2];
      }

      return steps;
    }
  }
);
