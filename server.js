var http = require("http")
  , util = require("util")
  , url = require("url")
  , jsdom = require("jsdom")
  ;

var server = http.createServer(function (request, response) {
  var hostname = url.parse(util.format("http://%s", request.headers.host)).hostname
    , weekly = (/wkly/.test(hostname)) ? /.*wkly/.exec(hostname).shift().replace(/js/, "javascript").replace(/wkly/, "weekly") : "javascriptweekly";
  jsdom.env(util.format("http://%s.com/archive/", weekly), function(errors, window) {
    var archives = window.document.getElementsByTagName("a").length - 1
      , redirect = util.format("http://%s.com/archive/%s.html", weekly, archives);
    response.writeHead(307, {"Content-Length":redirect.length, "Content-Type":"text/plain", "Location":redirect });    
    response.end(redirect);
  });
});

server.listen(process.env.PORT, process.env.IP);
