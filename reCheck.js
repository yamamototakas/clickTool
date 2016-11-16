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
