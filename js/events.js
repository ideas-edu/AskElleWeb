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
--  Event handlers for Hint Buttons
--
-----------------------------------------------------------------------------*/

function onBackClick() {
   if (derivation.length > 1  ) {
      if (lastSubmittedText == getWorkField()) {
         derivation.pop();
         fillAreas();
      } else {
         fillWorkField(lastSubmittedText);
      }
   }
   addToFeedback("", false);
   setFeedbackCode("");
}

function onReadyClick() {
   var state = derivation.last();
   
   function callback(solved) {
      var expression = state.term;
      var newText = '';
      if (solved) {
         newText = '<p>Yes, you are ready.</p>';
      } else {
         newText = '<p>No, either the function is not equivalent to the model' +
                   ' solution(s) or it still contains incomplete parts.</p>';
      }
    addToFeedback(newText, false);
  }
  
  if (state.term == "") {
    addToFeedback("You haven't entered a (partial) program yet, so you're definitely not ready.", true);
  } else {
    readyService('ready button', state, callback);    
  }
}

function onSubmitClick() {
   var workExpression = getWorkField();
   var state = derivation.last();
   setFeedbackCode('');
   lastSubmittedText = workExpression;
   
   function callback(result) {
      var state = arrayToState(result[2]);
      var newText = '<p>' + result[1] + '</p>';
      addToFeedback(newText, true);
      if (result[0]) {
         derivation.push(state);
      }
      ready = result[3];
   }
   
   feedbacktextdeepService('submit', state, workExpression, callback);
}

function onHintClick() {
   var state = derivation.last();
   
   function callback(rule, state) {
      var expression = state.term;
      var newText =   '<p><strong>' + rule + '</strong></p>';
      addToFeedback(newText, false); 
      setFeedbackCode('');
   }
   
   if (ready) {
     addToFeedback(finishedText, true);
   } else {
      onefirsttextService('hint', state, callback);
   }
}

function onDescClick() {
   var state = derivation.last();
   
   function callback(txts) {
      var newText = '<p>You can proceed with one of the following ways to solve the exercise:</p><ul>';
      for (i = 0; i < txts.length; i++) {
         var txt  = txts[i];
         newText += "<li>" + txt + "</li>";
      }
      addToFeedback(newText, false); 
      setFeedbackCode('');
   }
   
   if (ready) {
     addToFeedback(finishedText, true);
   } else {
      taskdescriptionService('desc', state, callback);
   }
}

function onStepClick() {
   var state = derivation.last();

   function callback(rule, state) {
      var arr  = rule.split("\\\\");
      var msg  = arr[0];
      var code = descape(arr[1]);
      addToFeedback('<p><strong>' + msg + '</strong></p>', false);
      setFeedbackCode(code);
   }
   
   if (ready) {
     addToFeedback(finishedText, true);
   } else {
      onefirsttextService('step', state, callback);
   }
}

function onOptionsClick() {
   var state = derivation.last();
   
   function callback(nexts) {      
      var newText = '<p>You can choose from the following options:</p><ul>';
      for (i = 0; i < nexts.length; i++) {
         var txt  = nexts[i][0];
         var code = nexts[i][1].term;
         newText += "<li>" + txt  + "<pre class='brush: haskell'>\n" + code + "\n</pre>" + "</li>";
      }
      newText += "</ul>";
      addToFeedback(newText, false); 
      SyntaxHighlighter.highlight();
      setFeedbackCode('');
   }
   
   if (ready) {
     addToFeedback(finishedText, true);
   } else {
      allfirststextService('options', state, callback);
   }
}

function onWorkedOutClick() {
   var state = derivation.last();

   function callback(result) {
     addToFeedback('<strong>Worked-out exercise</strong><br><br>', false);
     
     var newCode = "";
     for (i = 0; i < result.length; i++) {
         newCode += '--> Introduce '+ result[i][0] + '\n\n';
         newCode += descape(result[i][1]) + '\n\n';
      }
      setFeedbackCode(newCode);
   }
   
   if (ready) {
     addToFeedback(finishedText, true);
   } else {
      derivationtextService('worked-out', state, callback);
   }
}

/****************************************************
 * Event handlers for other buttons
 */

function onClearClick() {
  function callback(state) {
    $('feedback').update('');
    $('feedback_code').update('');
    derivation = [];
    fillWorkField(state.term);
    derivation.push(state);
  }

  generateService('tutor', "Medium", callback);
}
