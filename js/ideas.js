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

// The url for the services
var url = "cgi/fptutor.cgi";

var user=getUser();
// User name
function getUser() {
   return readCookie("user")==null ? "anonymous" : readCookie("user");
}

function readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

function setUser(usr) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + 1);
  var user_hash = md5(escape(usr));
  document.cookie = "user =" + user_hash + ";expires=" + exdate.toUTCString();
  user = user_hash;
}

function queryParams() {
  // remove the ?
  var s = document.location.search.substring(1);
  // split the string into keyvalue pair string
  var kvs = s.split('&');
  // init return value
  var params = {};
  
  for (i=0; i < kvs.length; i++) {
    //find the first =
    var pos = kvs[i].search(/=/i);
    // split keyvalue string into a key and value
    k = kvs[i].substring(0,pos);
    v = kvs[i].substring(pos+1); // strip of the = 
    // put the result in the return value
    params[decodeURIComponent(k)] = decodeURIComponent(v);
  }
  
  return params;
}

function getParam(str)
{
  return queryParams()[str];
}
