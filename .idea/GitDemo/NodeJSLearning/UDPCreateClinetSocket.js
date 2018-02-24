var dgram = require('dgram');

var client = dgram.createSocket('udp4');

//准备从终端输入，在启动处理IO流之前，必须调用resume（）方法

process.stdin.resume();

process.stdin.on('data',function (data) {
    console.log(data.toString('utf8'));
    client.send(data,0,data.length,8124,"examples.burningbird.net",function(err,bytes){
        if(err){
            console.log('error:'+err);
        }else{
            console.log('successful');
        }
    });
});