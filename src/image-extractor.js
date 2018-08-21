const http = require('http');
const fs = require('fs');
const path = require('path');

const saveImage = ((imgUrl, targetPath) => {
  return new Promise((resolve, reject) => {
    http.get(imgUrl, ({ statusCode, pipe }) => {
      if (statusCode !== 200) {
        return reject(`An error happened fetching the remote image. Status Error: ${statusCode}`);
      }

      let filePath = path.resolve(targetPath, path.basename(imgUrl));
      const file = fs.createWriteStream(filePath);
      pipe(file);
      return resolve();
    });
  });
})(
  'http://cdn.dota2.com/apps/dota2/images/heroes/techies_vert.jpg',
  'public/assets/images/dota-heroes'
);
