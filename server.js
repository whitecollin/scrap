const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const request = require('request');
const cheerio = require('cheerio');
const { log } = require('console');

const url = 'https://mdbootstrap.com/docs/standard/components/carousel/';

request(url, async (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    const imgUrls = [];

   await $('img').each((i, elem) => {
     imgUrls.push($(elem).attr('src'));
     request($(elem).attr('src'))
     .pipe(fs.createWriteStream('img'+i+'.jpg'))
     .on('close', () => {
       console.log(`Image ${'img'+i+'.jpg'} downloaded successfully`);
     })
     .on('error', (err) => {
       console.error(`Error downloading image: ${err}`);
     });
    });
    console.log(imgUrls);
    // response.send({ title });
  } else {
    console.log(error);
    // response.send({ error });
  }
});

// const imgUrl = 'https://www.example.com/image.jpg';
// const imgName = 'image.jpg';

// request(imgUrl)
//   .pipe(fs.createWriteStream(imgName))
//   .on('close', () => {
//     console.log(`Image ${imgName} downloaded successfully`);
//   })
//   .on('error', (err) => {
//     console.error(`Error downloading image: ${err}`);
//   });
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
