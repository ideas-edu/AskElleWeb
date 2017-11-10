/*jslint evil: true, regexp: false */

/*----------------------------------------------------------------------------
-- Copyright 2011, Open Universiteit Nederland. This file is distributed
-- under the terms of the GNU General Public License. For more information,
-- see the file "LICENSE.txt", which is included in the distribution.
-----------------------------------------------------------------------------
-- |
-- Maintainer  :  alex.gerdes@ou.nl
-- Stability   :  provisional
-- Portability :  unknown
--
-- Generic functions for showing a JSON object
--
-----------------------------------------------------------------------------*/

function showString(txt) {
   return '"' + txt.replace(/\"/g, "\\\"") + '"';
}

function showArray(arr) {
   var counter = 0;
   var result  = "[";
   while (counter < arr.length) {
        if (result!="[") {result += ",";}
      result += show(arr[counter]);
      counter++;
   }
   result+="]";
   return result;
}

function showObject(obj) {
   var result="{";
   var i;
   for (i in obj) {
     if (obj.hasOwnProperty(i)) {
       if (result!="{") {result += ",";}
       result += showString(i);
       result += ": ";
       result += show(obj[i]);
     }
   }
   result += "}";
   return result;
}

function show(obj) {
  if (typeof obj == "string") { return showString(obj); }
  if (obj.length >= 0) { return showArray(obj); }
  if (typeof obj == "object") { return showObject(obj); }
  return obj;
}


/****************************************************
 * Functions for making requests and service calls
 */

function parseJSON(json){
   try {
      if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)){
         var j = eval('(' + json + ')');
         return j;
      }
   }
   catch(e){}
   throw new SyntaxError("parseJSON");
}

function serviceCallFailure() {
   alert('service call failure');
   console.log("Fail!");
}

function serviceCall(request, callback) {
   var ajaxOptions =
      { parameters : 'input=' + request
      , onFailure  : serviceCallFailure
      , onSuccess  : function(response) {
           var resJSON = parseJSON(response.responseText);
           if (resJSON.error == null) {
              callback(resJSON.result);
           } else {
              callback(resJSON);
//              addToFeedback(resJSON.error, false);
           }
        }
     , onException: function(request,e) { console.log(e); }
     };
   var req = new Ajax.Request(url, ajaxOptions);
}

function makeRequest(caller, method, params) {
   var request = { "source"    : "progtutor"
                 , "event"     : caller
                 , "method"    : method
                 , "params"    : params
                 , "id"        : user
                 , "logging"   : "v2" 
                 };
   return show(request);
}

function arrayToState(arr) {
  return new State(arr[0], 
                   arr[1], 
                   escape(arr[2].htmlToAscii()), 
                   arr[3],
                   arr[4]);
}

function stateToArray(state) {
   return [state.code, 
           state.prefix, 
           encodeURIComponent(state.term), 
           state.context,
           state.ids];
}



/****************************************************
 * Services offered by the Exercise Assistant
 */

function exerciseListService(caller, callback) {
  var request  = makeRequest(caller, 'exerciselist', []);

  function exerciseListCallback (result) {
    var exercises = [];
    var i;
    for (i = 0; i < result.length; i++) {
      exercises[i] = new Exercise( result[i].description
                                 , result[i].exerciseid
                                 , result[i].status );
    }
    callback(exercises);
  }

   serviceCall(request, exerciseListCallback);
}

function groupListService(groupid, caller, callback) {
  var request  = makeRequest(caller, 'grouplist', [groupid]);

  function groupListCallback (result) {
    var exercises = [];
    var i;
    for (i = 0; i < result.length; i++) {
      exercises[i] = new Exercise( result[i].description
                                 , result[i].exerciseid
                                 , result[i].status );
    }
    callback(exercises);
  }

   serviceCall(request, groupListCallback);
}

function generateService(caller, number, callback) {
   var params  = [exerciseid, number, user];
   var request = makeRequest(caller, 'generate', params);

   function generateCallback (result) {
      var state = arrayToState(result);
      callback(state);
   }

   serviceCall(request, generateCallback);
}

function readyService(caller, state, callback) {
   var params   = [stateToArray(state)];
   var request  = makeRequest(caller, 'ready', params);

   serviceCall(request, callback);
}

function onefirsttextService(caller, state, callback) {
   var params   = [stateToArray(state), caller];
   var request  = makeRequest(caller, 'onefirsttext', params);

   function onefirsttextCallback(result) {
      var rule     = result[0];
      var newState = arrayToState(result[1]);
      callback(rule, newState);
   }

   serviceCall(request, onefirsttextCallback);
}

function taskdescriptionService(caller, state, callback) {
   var params   = [stateToArray(state), caller];
   var request  = makeRequest(caller, 'taskdescription', params);

   serviceCall(request, callback);
}

function allfirststextService(caller, state, callback) {
   var params   = [stateToArray(state), caller];
   var request  = makeRequest(caller, 'allfirststext', params);

   function allfirststextCallback(result) {
      var nexts = new Array();
      for (i=0; i < result.length; i++) {
        nexts[i] = [result[i][0], arrayToState(result[i][1])];
      }
      callback(nexts);
   }

   serviceCall(request, allfirststextCallback);
}

function allhintsService(caller, state, callback) {
   var params   = [stateToArray(state), caller];
   var request  = makeRequest(caller, 'allhints', params);

   function allfirststextCallback(result) {
      callback(result);
   }

   serviceCall(request, allfirststextCallback);
}

function derivationtextService(caller, state, callback) {
   var params   = [stateToArray(state), caller];
   var request  = makeRequest(caller, 'derivationtext', params);

   serviceCall(request, callback);
}

function stepsremainingService(caller, state, callback) {
   var params   = [stateToArray(state)];
   var request  = makeRequest(caller, 'stepsremaining', params);

   serviceCall(request, callback);
}

function submittextService(caller, state, newexpression, callback) {
   var params   = [stateToArray(state), encodeURIComponent(newexpression), caller];
   var request  = makeRequest(caller, 'feedbacktext', params);

   serviceCall(request, callback);
}

function feedbacktextdeepService(caller, state, newexpression, callback) {
   var params   = [stateToArray(state), newexpression, caller];
   var request  = makeRequest(caller, 'feedbacktextdeep', params);

   serviceCall(request, callback);
}
