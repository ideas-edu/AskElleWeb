Ext.require('Ext.app.Controller');

Ext.define
( 'FPT.controller.User'
, { extend: 'Ext.app.Controller'
  , views: ['user.Edit']
  , refs: [{ selector: '#fptutor'
           , ref: 'fptPanel'
           }
          ]
  , init:  function()
    {
      this.control(
        { 'useredit' : 
            { beforeclose: function () { this.getFptPanel().enable(); } }
        });
    }
  }
);
