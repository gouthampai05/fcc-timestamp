var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});



app.get("/api", (req, res) => {
  let date = new Date();
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
app.get("/api/:inputdate", (req, res) => {
  let date;
  const inputDate = req.params.inputdate;

  if (/^\d+$/.test(inputDate)) {
    date = new Date(parseInt(inputDate));
  } else {
    date = new Date(inputDate);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  const unixTime = date.getTime();
  const utcString = date.toUTCString();

  res.json({
    unix: unixTime,
    utc: utcString,
  });
});
