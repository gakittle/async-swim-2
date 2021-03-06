const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'js', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = queue => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.url === '/background.jpg') {
    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
      } else {
        res.writeHead(200, headers);
        res.write(data);
      }

      res.end();
      next();
    });
  } else {
    if (req.method === 'OPTIONS') {
      res.writeHead(200, headers);
      res.end();
    }

    if (req.method === 'GET') {
      res.writeHead(200, headers);

      const direction = req.url.split('=')[1];
      res.end(direction);
    }
    next(); // invoke next() at the end of a request to help with testing!
  }
};
