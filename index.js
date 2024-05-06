const express = require("express");
const app = express();
const multer = require("multer");
const mm = require("music-metadata");

const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.post("/", multer().array("media"), async function (req, res, next) {
  let uploadedMedia = [];

  for (let index = 0; index < req.files.length; index++) {
    let metadata = await mm.parseBuffer(req.files[index].buffer);
    uploadedMedia.push({ 
        title: metadata.common.title,
        artist: metadata.common.artist,
        artists: metadata.common.artists,
        year: metadata.common.year,
        album: metadata.common.album,
        genre: metadata.common.genre
    });

    console.log(uploadedMedia);
    // console.log(metadata);
  }

  try {
  } catch (error) {}
  res.send(JSON.stringify(req.files));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
