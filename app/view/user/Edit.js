Ext.require('Ext.window.Window');
Ext.require('Ext.form.Panel');

Ext.define('FPT.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    title : 'Please enter your name',
    layout: 'fit',
    autoShow: true,

    closable: false,
    modal: true,
    model: 'User',
    
    items:
      { xtype: 'form'
      , items: 
        { xtype: 'textfield'
          , name : 'name'
          , fieldLabel: 'Name'
          , margin: "2 2 2 2"
          , listeners:
          { specialkey: function (field, e) {
              if (e.getKey() == e.ENTER) {
                  this.up('form').submit();
              }
            }
          }
        }
      , buttons: [
          { text: 'Terms of use',
            buttonAlign: 'left',
            handler: function() { this.up('form').terms_of_use(); }
          },
          { text: 'Ok',
            handler: function () { this.up('form').submit(); }
          }]
      , submit: function ()
         {
           var form = this.getForm();
           if (form.findField('name').value != undefined && form.findField('name').value != "")
           {
             setUser(form.findField('name').value);
             this.up('useredit').close();
           }
           else
           {
             alert("Please enter your name!");
           }
         }
      , terms_of_use: function ()
         {
           alert("We log interactions with Ask-Elle for research purposes. " +
                 "We will never disclose individual user data. " + 
                 "When you login you agree with using your interactions for research.");
         }
      }
   , bodyPadding: "5 5 5 5"
   , initComponent: function ()
     {
       this.callParent(arguments);
       this.getComponent(0).form.findField('name').focus(true, 10);
     }
});
