const express = require("express");
const app = express();
const multer = require('multer');
const mm = require('music-metadata');

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
app.post("/", multer().single('media'), async function (req, res, next) {
    console.log(req.body);
    console.log(req.file);
    const metadata = await mm.parseBuffer(req.file.buffer);
    console.log(metadata);
    res.send(JSON.stringify(req.file));
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
