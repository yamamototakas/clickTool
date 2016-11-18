const https = require('https');
const request = require('request');
const zlib = require('zlib');
const util = require('util');
const http = require('http');

var jQuery = require('jquery-deferred');
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
        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Length': Buffer.byteLength(postData)
    }
};//require('./postOptions.json');
var getOptions = require('./getOptions.json');
var options_request = {
    url: 'http://hapitas.jp/',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
//        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'text/plain;charset=utf-8',
        "Proxy-Connection": "keep-alive",
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

var post_options_request = {
    url: 'https://hapitas.jp/auth/signin?',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'text/plain;charset=utf-8'
    },
    form: postData,
//    proxy: 'http://myhost:8888',
    strictSSL: false,
    jar: true
};

console.log(postData);

//return null;

var Cookies;
var CookieHeaders = [];
//exports.handler = (event, context, callback) => {
//    console.log("recived event", event);
var delay = function(){
    $ = require('jquery-deferred');
    var d = $.Deferred();
    console.log('deffinition of d');
    setTimeout(function(){
    console.log('before resolve');
    d.resolve();
    console.log('after resolve');
    },1000);
    return d;
};
delay()
    .then(function(){
    console.log('delayed');
    })
    .then(function(){
    console.log('delayed2');
    })
    .fail(function(error){
    console.log('delayed error!!');
});

var dfdSingin = function (Cookies) {
    var dfd = jQuery.Deferred();

    request.post(post_options_request, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cookieHeaders = response.headers["set-cookie"];
            Cookies = cookieHeaders[cookieHeaders.length - 1].match(/(\S+);/)[1];
            options_request.headers["Cookie"]=Cookies;
            console.log(options_request);
            dfd.resolve();

        }
        else {
            console.log("Error happened", error);
            dfd.reject();

        }
        return dfd.promise();
    });
};

var dfdCandidateURL = function (Cookies) {
    var dfd = jQuery.Deferred();

    request.post(post_options_request, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            cookieHeaders = response.headers["set-cookie"];
            Cookies = cookieHeaders[cookieHeaders.length - 1].match(/(\S+);/)[1];
            options_request.headers["Cookie"]=Cookies;
            console.log(options_request);
            dfd.resolve();

        }
        else {
            console.log("Error happened", error);
            dfd.reject();

        }
        return dfd.promise();
    });
};

return 0;

request.post(post_options_request, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(response.statusCode);
        console.log(console.log(response.headers));

        cookieHeaders = response.headers["set-cookie"];
        Cookies = cookieHeaders[cookieHeaders.length - 1].match(/(\S+);/)[1];
        options_request.url = 'https://hapitas.jp/index/ajaxclickget';
        options_request.headers["Cookie"]=Cookies;
        console.log(options_request);

        request.get(options_request, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Show the HTML for the Google homepage.
                console.log(response.headers);
                result=body.match(/clickget.recive.+top_clickget/g);

                var uResult = new Set(result);
                uResult.forEach(function (value) {
                    options_request.url = 'http://hapitas.jp/' +value;
                    console.log(options_request);

                    request.post(post_options_request, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            cookieHeaders = response.headers["set-cookie"];
                            Cookies = cookieHeaders[cookieHeaders.length - 1].match(/(\S+);/)[1];
                            options_request.headers["Cookie"]=Cookies;


                            request.get(options_request, function (error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    //console.log(body) // Show the HTML for the Google homepage.
                                    console.log(response.headers);
                                }
                                else {
                                    console.log("Error happened", error);
                                }
                            });
                        }
                        else {
                            console.log("Error happened", error);
                        }
                    });
                });

            }
            else {
                console.log("Error happened", error);
            }
        });
    }
    else {
        console.log("Error happened", error);
    }
});
//*//
