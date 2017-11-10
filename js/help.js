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
-----------------------------------------------------------------------------*/

function flatten(array){
    var flat = [];
    for (var i = 0, l = array.length; i < l; i++){
        var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
        if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
    }
    return flat;
}

function depth(obj) {
  var md=0,
      recurse=function(o, cd){
        if (cd > md) md=cd;
        for (var k in o) if (o.hasOwnProperty(k)) {
          if (typeof o[k] == 'object' && o[k] !== null) {
            recurse(o[k], cd+1);
          }
        }
      };
  
  recurse(obj, 0);
  
  return md;
}

function odump(object, depth, max){
  depth = depth || 0;
  max = max || 2;

  if (depth > max)
    return false;

  var indent = "";
  for (var i = 0; i < depth; i++)
    indent += "  ";

  var output = "";  
  for (var key in object){
    output += "\n" + indent + key + ": ";
    switch (typeof object[key]){
      case "object": output += odump(object[key], depth + 1, max); break;
      case "function": output += "function"; break;
      default: output += object[key]; break;        
    }
  }
  return output;
}

function addToFeedback(newText, fade) {
   unfade();
   $('feedback').update(descape(newText));
   $('feedback').scrollTop = $('feedback').scrollHeight;

   if (fade) doFade(100);
}

function doFade(opVal) {
   var newOpVal = opVal - 2;
   
   if (newOpVal > 50) {
      $('feedback').style.opacity = newOpVal/100;
      $('feedback').style.filter  = 'alpha(opacity = ' + newOpVal + ')';
      setTimeout("doFade(" + newOpVal + ")", 33); 
   } else if (newOpVal > 0) {
      $('feedback').style.opacity = (100 - newOpVal)/100;
      $('feedback').style.filter  = 'alpha(opacity = ' + (100 - newOpVal) + ')';
      setTimeout("doFade(" + newOpVal + ")", 33); 
   }
}

function unfade() {
  $('feedback').style.opacity = 100;
  $('feedback').style.filter  = 'alpha(opacity = 1)';
}

/**
 * From HTML characters to ascii and back
  */
String.prototype.htmlToAscii = function() {
    var s = this.replace(/\\/g, '\\\\');
    return s;
}

String.prototype.asciiToHtml = function() {
   var resultstring = this.replace(/>/g, '&gt;');
   resultstring = resultstring.replace(/</g, '&lt;');
   resultstring = resultstring.replace(/\\\\/g, '\\');
    return resultstring;
}

Array.prototype.all = function (f) {
  for (var i = 0; i < this.length; i++)
    if (!f(this[0])) return false
  return true;
}

Array.prototype.any = function (f) {
  for (var i = 0; i < this.length; i++)
    if (f(this[0])) return true;
  return false;
}

/**
* produce text in HTML, on seperate lines.
*/
function writeArray(list) {
   elements = "";
   for (var i = 0; i < list.length; ++i) {
      elements = elements + list[i] + ",<br>";
   }
   return elements;
}

function parse(json){
    try{
        if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(json)){
            var j = eval('(' + json + ')');
            return j;
      }
   }catch(e){
    }
    throw new SyntaxError('parseJSON');
}

/**
 * Een datatype voor regels en de expressie die het resultaat is van het toepassen van die regel
 */
 function Rule(name, location, expression) {
   this.name = name;
   this.location = location;
   this.expression = expression;
 }

function State(code, prefix, term, context, ids) {
   this.code    = code;
   this.prefix  = prefix;
   this.term    = term;
   if (context.nameMap) {
      escapedNameMap  = context.nameMap.replace(/\"/g, "\\\"");
      context.nameMap = escapedNameMap;
   }
   this.context = context;
   this.ids     = ids;
   if (ids) {
     this.ids[2] = "undefined";
   }
}

function Exercise(description, exerciseid, status) {
  this.description = description;
  this.exerciseid  = exerciseid;
  this.status      = status;
}

derivation = [];
ready = false;
finishedText = "You have already finished the exercise. You can click the 'Exercise list' button to choose a new exercise.";
lastSubmittedText = "";

function fillAreas() {
   var state = derivation.last();
   fillWorkField(state.term);
}

function fillWorkField(term) {
  var newterm = descape(term);
  editor.mirror.setValue(newterm + newLines(23)); /* Append newlines to make editor `clickable' at any place */
}

function newLines(n) {
  var ls = '';
  for (var i = 0; i < n; i++) {
    ls += '\n';
  }
  return ls;
}

function getWorkField() {
   return escape(editor.mirror.getValue().htmlToAscii());
}

function updateDerivation() {
  var d = "";
  for (var i = 0; i < derivation.length; i++) {
    d += derivation[i].term + "\n\n-->\n\n"
  }
  setFeedbackCode(d);
}

function setFeedbackCode(code) {
  $('feedback_code').update("<pre class='brush: haskell'>\n" + code + "\n</pre>");
  SyntaxHighlighter.highlight();
}

function showFeedbackButtons(show) {
  var elems = $$('.feedback_buttons');
  for (var i = 0; i < elems.length; i++) {
    if (show) {
      elems[i].show();
    } else {
      elems[i].hide();
    }
  }
}

function escape(term) {
   return term.replace(/(\n)/g, "\\n").replace(/\"/g, "\\\"");
}

function descapeDesc(term) {
   return term.replace(/\\\\n/g, "<br/>").replace(/\\\\/g, "<br/>").replace(/\\\"/g, "\"");
}

function descapeHint(term) {
   //console.log(term);
   return term.replace(/\\n/g, "<br/>").replace(/\\\\/g, "<br/><br/>").replace(/\\\"/g, "\"");
}

function descape(term) {
   return term.replace(/\\\\/g, "\\").replace(/\\n/g, "\n").replace(/\\\"/g, "\"").replace(/\\\\/g, "<br/>");
}

function unQuote(term) {
  return term.substring(1,term.length-1);
}
