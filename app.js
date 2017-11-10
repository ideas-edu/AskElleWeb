Ext.require('Ext.container.Viewport');
Ext.require('Ext.panel.Panel');

//HACK to make the iframe work
function refreshLinks ()
{
  Ext.query(".feedbackurl").each
    ( function (x)
      {
        var hrefNode = x.attributes.getNamedItem("href");
        var lnk = hrefNode.textContent;
        if (lnk != "#")
        {
          hrefNode.textContent = "#";
          var clk = document.createAttribute("onclick");
          clk.nodeValue = "Ext.widget('external').showUrl('" + lnk + "');";
          x.attributes.setNamedItem(clk);
        }
      }
    );
}

setInterval(refreshLinks, 150);

Ext.application
(
  { name: 'FPT'
  , controllers: ['Exercises', 'Tutor', 'Helper', 'User']
  , views: ['External']
  , launch: function () 
    {
      vp = Ext.create
      ( 'Ext.container.Viewport'
      , { autoHeight: true
        , items:
            { xtype:  'panel'
            , layout: 'border'
            , width:  1000
            , height: '100%'
            , id:     'fptutor'
            , defaults: { split: true }
            , style:
              { marginLeft: 'auto'
              , marginRight: 'auto'
              }
            , bodyPadding: 2
            , autoHeight: true
            , items: 
                [ { html: '<table width="100%"> \
                              <tr> \
                                <td width="20%"><img src="images/OU_logo.png" height="80px"/></td> \
                                <td width="60%" align="center"><div class="x-panel-header-text-default"><font size="36px">Ask-Elle</font></div></td> \
                                <td width="20%" align="right"><img src="images/haskell.png" height="80px"/></td> \
                              </tr> \
                            </table>'
                  , region: 'north'
                  , height: 95
                  , width: '100%'
                  , bodyStyle: 'padding: 5px'
                  }
                , { xtype: 'tutor'
                  , region: 'center'
                  , width: '100%'
                  , disabled: true
                  }
                , { xtype: 'exerciselist'
                  , region: 'west'
                  , width: 180
                  , collapsible: true
                  , collapsed: false
                  , animCollapse: true
                  }
                , { xtype: 'panel'
                  , layout: 'fit'
                  , region: 'east'
                  , collapsible: true
                  , collapsed: false
                  , id: 'helperPanel'
                  , name: 'helperPanel'
                  , disabled: true
                  , animCollapse: true
                  , width: 400
                  , title   : 'Help'
                  , items:
                    { xtype: 'helper'
                    , border: false  
                    }
                  }
                ]
            }
        }
      );
      if(getParam("group") == undefined)
        this.getController("Exercises").loadAllExercises();
      else
        this.getController("Exercises").loadExerciseGroup(getParam("group"));

//      Ext.widget('external').show();

      if(user == "anonymous")
        Ext.widget('useredit');
    }
  }
);


