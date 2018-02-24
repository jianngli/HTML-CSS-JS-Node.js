var dns = require('dns');
dns.lookup('burningbird.net',function(err,ip) {
    if(err) throw err;
    console.log(ip);
});

dns.reverse('173.255.206.103',function (err,domains) {
    domains.forEach(function (t) {
        console.log(t);
    });
});