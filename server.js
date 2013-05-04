var http = require("http")
  , jsdom = require("jsdom")
  , server
  ;
    
server = http.createServer(function (request, response) {
  jsdom.env("http://javascriptweekly.com/archive/", function(errors, window) {
    var archives = window.document.getElementsByTagName("a").length - 1
      , redirect = "http://javascriptweekly.com/archive/" + archives + ".html";
    response.writeHead(307, {"Content-Length":redirect.length, "Content-Type":"text/plain", "Location":redirect });    
    response.end(redirect);
  });
});

server.listen(process.env.PORT, process.env.IP);
