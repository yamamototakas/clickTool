const https = require('https');
const request = require('request');
const zlib = require('zlib');
const util = require('util');


var sample = "zabcabcabcdefghijklmnopqrstuvwxyzcabc"
var re = /abc/g;
var matched = re.exec(sample);
console.log(sample.match(/abc/g));

if(matched)
    console.log(matched);
else
    console.log("No matches");

var input={
    'set-cookie':
   [ 'x-hapitas-yourtoken=qn29ot25qptotjl89el11gga3dd249t4; expires=Mon, 21-Nov-2016 12:16:33 GMT; path=/',
     'x-hapitas-yourtoken=r7s08crhmhg5tjvkbbh0f65g35q7o8bc; path=/' ]};

var cookieHeaders = input["set-cookie"];

console.log(input);
console.log(cookieHeaders);

var reCookie = /(\S+);\s/;
var matchedCookie = reCookie.exec(cookieHeaders[0]);

cookieHeaders["Cookie"]=[];
cookieHeaders["Cookie"].push(reCookie.exec(cookieHeaders[0])[1]);
cookieHeaders["Cookie"].push(reCookie.exec(cookieHeaders[1])[1]);
console.log(cookieHeaders);

console.log(cookieHeaders[0].match(/(\S+);/));

var str1 = cookieHeaders[0].match(/(\S+);/)[1];
var str2 = cookieHeaders[1].match(/(\S+);/)[1];
var str = str1 + "; " + str2;
console.log(str);

var options_request = {
    url: 'http://hapitas.jp/clickget/recive/id/2446/apn/top_clickget',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
//        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'text/plain;charset=utf-8',
        "Proxy-Connection": "keep-alive",
        "Cookie": "x-hapitas-yourtoken=uej9n5tc56qk0gka3uv2uvk19eb26b28",
    },
        /*    agentClass: Agent,
    agentOptions: {
        socksHost: 'myhost', // Defaults to 'localhost'.
        socksPort: 8888 // Defaults to 1080.
    },
//*/
//    proxy: 'http://myhost:8888',
    strictSSL: false,
    jar: true
};

/*
request.get(options_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body) // Show the HTML for the Google homepage.
        console.log(response.headers);
        console.log(body);
    }
    else {
        console.log("Error happened", error);
    }
});
*/
