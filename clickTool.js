const https = require('https');
const request = require('request');
const zlib = require('zlib');
const util = require('util');
const http = require('http');

const Agent = require('socks5-http-client/lib/Agent');
const soks5 = require('socks5-http-client');

var postData = require('./credential.json');
postData=JSON.stringify(postData);
var postOptions = {
    hostname: 'hapitas.jp',
    port: 443,
    path: '/auth/signin',
    method: 'POST',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
        "Referer": "http://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Length': Buffer.byteLength(postData)
    }
};//require('./postOptions.json');
var getOptions = require('./getOptions.json');
var options_request = {
    url: 'https://hapitas.jp/',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'text/plain;charset=utf-8'
    },
/*    agentClass: Agent,
    agentOptions: {
        socksHost: 'myhost', // Defaults to 'localhost'.
        socksPort: 8888 // Defaults to 1080.
    },
//*/
    proxy: 'http://myhost:8888',
    strictSSL: false,
    jar: true
};


console.log(postData);

//return null;

var Cookies = [];
//exports.handler = (event, context, callback) => {
//    console.log("recived event", event);

//*//
    var req = https.request(postOptions, function(res){
        var buff = new Buffer.from([]);
        var chunks = [];
        var isBuffer = true;
        chunks.totalLength = 0;

        res.setEncoding('utf8');
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function(buff) {
            if (!Buffer.isBuffer(buff))  isBuffer = false;
            console.log("buff is String :",buff instanceof String);
            console.log("buff is Buffer :",buff instanceof Buffer);
            console.log("typeof is :",typeof buff);
            chunks.push(buff);
            chunks.totalLength += buff.length;
            //console.log('\n\n--- Data ---\n', buff);
        });
        res.on('end', () => {
            console.log('No more data in response.');
            console.log("res:",res.statusCode);
            console.log("length:", chunks.length);
            console.log("Total length:", chunks.totalLength);
            console.log("isBuffer :", isBuffer);
            if(isBuffer) var body = Buffer.concat(chunks,chunks.totalLength).toString("base64");
            else var body = chunks.toString("base64");

            //console.log(body);

            //console.log(util.inspect(res,null,null));
            //console.log(JSON.stringify(res.headers, null,'    '));
            var cookieHeaders = res.headers["set-cookie"];
            //console.log(cookieHeaders);
            //getOptions.headers["Cookie"]=[];
            cookieHeaders.forEach(function(value){
                Cookies.push(value.match(/(\S+);/)[1]);
            });
            console.log(Cookies);
            getOptions.headers["Cookie"]=[...Cookies];

            var req2 = http.get(getOptions, function(res){
                var buff = new Buffer.from([]);
                var chunks = [];
                var isBuffer = true;
                chunks.totalLength = 0;
                res.setEncoding('utf8');

                res.on('data', function(buff) {
                    if (!Buffer.isBuffer(buff))  isBuffer = false;
                    chunks.push(buff);
                    chunks.totalLength += buff.length;
                });
                res.on('end', () => {
                    if(isBuffer) var body = Buffer.concat(chunks,chunks.totalLength).toString("base64");
                    else var body = chunks.toString("base64");

                    result=body.match(/clickget.recive.+top_clickget/g);

//*
                    var uResult = new Set(result);
                    uResult.forEach(function (value) {

                    options_request.url = 'https://hapitas.jp/' +value;
                    options_request.headers["Cookie"]=[...Cookies];
                    console.log(options_request);

                    request.get(options_request, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body) // Show the HTML for the Google homepage.
                        }
                        else {
                            console.log("Error happened", error);
                        }
                    })

/*
                        getOptions.path = '/'+value;
                        console.log(getOptions);

                        var req3 = http.get(getOptions, function(res){
                            var buff = new Buffer.from([]);
                            var chunks = [];
                            var isBuffer = true;
                            chunks.totalLength = 0;
                            res.setEncoding('utf8');

                            res.on('data', function(buff) {
                                if (!Buffer.isBuffer(buff))  isBuffer = false;
                                chunks.push(buff);
                                chunks.totalLength += buff.length;
                            });
                            res.on('end', () => {
                                if(isBuffer) var body = Buffer.concat(chunks,chunks.totalLength).toString("base64");
                                else var body = chunks.toString("base64");
                                console.log(JSON.stringify(res.headers, null,'    '));
                                console.log("res:",res.statusCode);

                                console.log(body);
                                result=body.match(/.+top_clickget.+/g);
                                console.log(result);
                            });

                        }).on('error', (e) => {
                            console.log("Error in request",e);
                        });
                        //*/
                    });
                });

            }).on('error', (e) => {
                console.log("Error in request",e);
            });

        });

    });
    //*
    req.write(postData);
    console.log('Write post data to body');
    req.end();

    req.on('error', (e) => {
        console.log("Error in request",e);
    });
