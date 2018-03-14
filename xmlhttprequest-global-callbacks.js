/**
 * XMLHttpRequest Global Callbacks
 * @version 1.0
 * @copyright Copyright by N-Dream AG, 2018
 * @licence GNU General Public License v3.0
 * @git:
 */

(function() {
  if (window.Proxy) {
    var OriginalXMLHTTPRequest = XMLHttpRequest;
    window.XMLHttpRequest = function (arg) {
      var request_method;
      var request_url;
      var xmlhttprequest = new OriginalXMLHTTPRequest(arg);
      if (window.xmlHTTPRequestGlobalCallbacks) {
        for (var name in window.xmlHTTPRequestGlobalCallbacks) {
          (function(on) {
            xmlhttprequest.addEventListener(
                on,
                function (evt) {
                  window.xmlHTTPRequestGlobalCallbacks[on](
                      evt, request_method, request_url);
                });
          })(name);
        }
      }
      var result = new Proxy(xmlhttprequest, {
        get: function(target, name) {
          if (name == "open") {
            return function() {
              request_method = arguments[0];
              request_url = arguments[1];
              return target[name].apply(target, arguments);
            }
          } else if (typeof target[name] == "function") {
            return function() {
              return target[name].apply(target, arguments);
            }
          } else {
            return target[name];
          }
        },
        set: function(target, name, value) {
          target[name] = value;
        }
      });
      return result;
    }
    for (var constant in OriginalXMLHTTPRequest) {
      window.XMLHttpRequest[constant] = OriginalXMLHTTPRequest[constant];
    }
  }
})();