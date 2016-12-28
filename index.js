//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');

//目标网址
var url = 'https://www.zhihu.com/question/53822946';

//本地存储目录
var dir = './images';

//创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

//发送请求
request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        $('img').each(function () {
            var src = $(this).attr('src');
            if (/^http/.test(src)) {
                console.log('正在下载' + src);
                download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4));
                console.log('下载完成');
            }

        });
    }
});

//下载
var download = function (url, dir, filename) {
    request.head(url, function (err, res, body) {
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
//copy from https://github.com/focalhot/node.js-crawler