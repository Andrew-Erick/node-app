(function() {
     var getUrlParam = function (param) {
         var codedParam = (new RegExp(param + '=([^&]*)')).exec(window.location.search)[1];
         return decodeURIComponent(codedParam);
     };

     var baseUrl = getUrlParam('xdm_e') + getUrlParam('cp');
     var options = document.getElementById('connect-loader').getAttribute('data-options');

     var script = document.createElement("script");
     script.src = baseUrl + '/atlassian-connect/all.js';

     if(options) {
         script.setAttribute('data-options', options);
     }

     document.getElementsByTagName("head")[0].appendChild(script);
 })();