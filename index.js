var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 5000);

app.post("/", function(req, res) {
  request(
    {
      url: "http://quicklatex.com/latex3.f/",
      method: "post",
      form: {
        formula: req.body.text,
        fsize: "36px",
        fcolor: "000000",
        mode: "0",
        out: "1",
        remhost: "quicklatex.com",
        preamble:
          "\\usepackage{amsmath} \\usepackage{amsfonts} \\usepackage{amssymb} \\usepackage{graphicx} \\usepackage{mhchem}",
        errors: "1"
      }
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
        return res.status(500).send("something broke!");
      }
      var image = body.split("\n")[1].split(" ")[0];

      var params = {
        unfurl_media: true,
        response_type: "in_channel",
        attachments: [
          {
            color: "#36a64f",
            fallback: "quicklatex.com",
            footer: "quicklatex.com",
            image_url: image
          }
        ]
      };
      res.status(200).send(params);
    }
  );
});

app.listen(app.get("port"), function() {
  console.log("Node app is running on port", app.get("port"));
});
