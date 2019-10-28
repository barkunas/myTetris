process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
process.env.NTBA_FIX_319 = 1;

var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function () {
    console.log('Example app listening on port ' + 3000);
  });

module.exports = app;