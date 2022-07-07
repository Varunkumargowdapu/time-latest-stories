import express from "express";
import axios from "axios";
import DOMParser from "dom-parser";

const PORT = 3000;

const app = express();

app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}.`));
app.get("/getTimeStories", async (request, response) => {
  let apiResponse = await axios.get("https://time.com");
  let htmlDataFromTime = apiResponse.data;
  var doc = new DOMParser().parseFromString(htmlDataFromTime, "text/html");
  let ResponseArray = [];

  for (var i = 0; i <= 5; i++) {
    ResponseArray.push({
      title: doc
        .getElementsByClassName("latest-stories__item")
        [i].getElementsByTagName("h3")[0].innerHTML,
      link: `https://time.com${doc
        .getElementsByClassName("latest-stories__item")
        [i].getElementsByTagName("a")[0]
        .getAttribute("href")}`,
    });
  }

  response.send(ResponseArray);
});
