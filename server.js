var http = require("http")
  , util = require("util")
  , url = require("url")
  , request = require('request')
  , cheerio = require('cheerio')
  ;

var server = http.createServer(function(req, res){
  var hostname = url.parse(util.format("http://%s", req.headers.host)).hostname
    , weekly = (/wkly/.test(hostname)) ? /.*wkly/.exec(hostname).shift().replace(/js/, "javascript").replace(/wkly/, "weekly") : "javascriptweekly";
  request(util.format("http://%s.com/issues", weekly), function (error, response, body){
    var $ = cheerio.load(body)
      , issue = $('li.issue a[href^="issues/"]').length
      , redirect = util.format("http://%s.com/issues/%s", weekly, issue);
    res.writeHead(307, {"Content-Length":redirect.length, "Content-Type":"text/plain", "Location":redirect });
    res.end(redirect);
  });
});

server.listen(process.env.PORT || 5000, process.env.IP);
