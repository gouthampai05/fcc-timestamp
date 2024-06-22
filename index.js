var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api", (req, res) => {
  let date = new Date();

  const unixTime = date.getTime();

  const utcDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const utcDate = date.getDate();
  const utcMonth = date
    .toLocaleTimeString("en-US", { month: "short" })
    .split(",")[0];
  const utcYear = date.getFullYear();

  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();

  res.json({
    unix: unixTime,
    utc: `${utcDay}, ${utcDate} ${utcMonth} ${utcYear} ${utcHours}:${utcMinutes}:0${utcSeconds} GMT`,
  });
});

app.get("/api/:inputdate", (req, res) => {
  const inputDate = req.params.inputdate;

  //assumes standard date format
  let date = new Date(inputDate);

  //will be NaN if input is unix time
  if (isNaN(date.getTime())) {
    date = new Date(inputDate * 1);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  }

  const unixTime = date.getTime();

  const utcDay = date.toLocaleDateString("en-US", { weekday: "short" });
  const utcDate = date.getDate();
  const utcMonth = date
    .toLocaleTimeString("en-US", { month: "short" })
    .split(",")[0];
  const utcYear = date.getFullYear();

  const utcHours = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();

  res.json({
    unix: unixTime,
    utc: `${utcDay}, ${utcDate} ${utcMonth} ${utcYear} 0${utcHours}:0${utcMinutes}:0${utcSeconds} GMT`,
  });
});
