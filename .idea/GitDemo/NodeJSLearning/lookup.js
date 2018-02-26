// var dns = require('dns');
// dns.lookup('burningbird.net',function(err,ip) {
//     if(err) throw err;
//     console.log(ip);
// });
//
// dns.reverse('173.255.206.103',function (err,domains) {
//     domains.forEach(function (t) {
//         console.log(t);
//     });
// });
//
// dns.resolve('burningbird.net','NS',function(err,domains){
//     domains.forEach(function (t) {
//         console.log(t);
//     });
// });
var util = require('util');
var fs =require('fs');
var eventEmitter = require('events').EventEmitter;
function inputCheker(name,file) {
    this.name = name;
    this.writeStream = fs.createWriteStream('./'+file+'.txt',{
        'flags':'a',
        'encoding':'utf8',
        'mode':0666
    });
};
util.inherits(inputCheker,eventEmitter);
inputCheker.prototype.check = function check(input) {
    var command = input.toString().trim().substr(0,3);
    if(command == 'wr:'){
        this.emit('write',input.substr(3,input.length));
    }else if(command == 'en:'){
        this.emit('end');
    }else{
        this.emit('echo',input);
    }
};


var ic = new inputCheker('Shelley','output');
ic.on('write',function (data) {
    this.writeStream.write(data,'utf8');
});
ic.on('echo',function (data) {
    console.log(this.name+'wrote'+data);
});
ic.on('end',function () {
    process.exit();
});


process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data',function (input) {
    ic.check(input);
});