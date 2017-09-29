var express = require('express');
var bodyParser = require('body-parser');
var mj = require("mathjax-node");
mj.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mj.start();
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));

app.post('/', function (request, response) {
  console.log(request.body.text);
  mj.typeset({
    math: request.body.text,
    format: "inline-TeX",
    svg: true
  }, (data) => {
    if(data.errors) {
      console.log("error! couldn't render " + request.body.text);
      response.status(500).send("something broke!");
    } else {
      response.status(200).send(data.svg)
    }
  })
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
