const https = require('https');
const request = require('request');
const zlib = require('zlib');
const util = require('util');
const http = require('http');

var jQuery = require('jquery-deferred');
var postData = require('./credential.json');

console.log(postData);
console.log(postData[1]);
console.log(postData['password']);
console.log("Inspect\n", util.inspect(postData));
console.log(postData.length);
console.log(JSON.stringify(postData, null, 2));
console.log(Object.keys(postData));

//return;
//postData=JSON.stringify(postData);

var options_request = {
    url: 'http://hapitas.jp/',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
        //"Referer": "https://hapitas.jp/auth/signin",
        "Accept-Encoding": "sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'text/plain;charset=utf-8',
        "Upgrade-Insecure-Requests": "1",

        //"Proxy-Connection": "keep-alive",
    },
//    proxy: 'http://myhost:8888',
//    strictSSL: false,
    jar: true
};

var post_options_request = {
    url: 'https://hapitas.jp/auth/signin',
    headers:{
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
        "Referer": "https://hapitas.jp/",
        "Accept-Encoding": "sdch",//gzip,deflate,sdch",
        "Accept-Language": "ja,en-US;q=0.8,en;q=0.6",
        'Content-Type': 'application/x-www-form-urlencoded',
        "Upgrade-Insecure-Requests": "1",
        //"Content-Length": "108"//Buffer.byteLength(postData),
    },
/*//    form: {
            mail: 'mossom9@gmail.com',
            password: '0606060606060606',
            login_keep: 'on',
            signin: 'login'
    },//*/
    form: postData,
//    proxy: 'http://myhost:8888',
//    strictSSL: false,
    jar: true
};

//return null;
console.log(Buffer.byteLength(JSON.stringify(postData)+'\n'));
var Cookies;
var CookieHeaders = [];
var urlList;
//exports.handler = (event, context, callback) => {
//    console.log("recived event", event);
var delay = function(){
    var d = jQuery.Deferred();
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

var dfdSingin = function (options) {
    var dfd = jQuery.Deferred();

    request.post(options, function (error, response, body) {
        if (!error) {
            var tmpCookie = response.headers["set-cookie"];
            console.log(tmpCookie);
            Cookies = tmpCookie[tmpCookie.length-1].match(/(\S+);/)[1];
            console.log(options);
            console.log(response.headers);
            dfd.resolve();
        }
        else {
            console.log(response.statusCode);
            console.log("Error happened", error);
            dfd.reject();
        }
    });
    return dfd.promise();
};

var dfdCandidateURL = function (options) {
    var dfd = jQuery.Deferred();

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body);
            var result=body.match(/(clickget.recive.+top_clickget)/g);
            var setResult = new Set(result);
            urlList = [...setResult];

            console.log(response.headers);
            dfd.resolve();
        }
        else {
            console.log("Error happened", error);
            dfd.reject();
        }
    });
    return dfd.promise();
};

var dfdGetURL = function (options) {
    var dfd = jQuery.Deferred();

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(options);
            console.log(response.headers);
            ///item/redirect/itemid/49694/p/0/click/2449/apn/top_clickget/linkid/782
            ///item/redirect/itemid/63079/p/0/click/2448/apn/top_clickget
            var result=body.match(/(item.redirect\S+)"\s/);
            if(result){
                options.url="http://hapitas.jp/"+result[1];
                options.headers["Cookie"] = Cookies;
                console.log(options);
                return dfdGetURL(options);
            }

            //console.log(body);
            dfd.resolve();
        }
        else {
            console.log("Error happened", error);
            dfd.reject();
        }
    });
    return dfd.promise();
};


dfdSingin(post_options_request)
    .then(function(){
        console.log(Cookies);
    })
    .then(function(){
        options_request.url ="http://hapitas.jp/index/ajaxclickget";
        options_request.headers["Cookie"] = Cookies;
        return dfdCandidateURL(options_request);
    })
    .then(function(){
        console.log(urlList);
        urlList.forEach(function(each) {
            options_request.url ="http://hapitas.jp/" + each;
            options_request.headers["Cookie"] = Cookies;
            return dfdGetURL(options_request);
        });
    })
    .fail(function(error){
        console.log('Main function delayed error!!');
});
