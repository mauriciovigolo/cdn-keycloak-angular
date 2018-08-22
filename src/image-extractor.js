const http = require('http');
const fs = require('fs');
const path = require('path');

const fetchImage = imgUrl => {
  return new Promise((resolve, reject) => {
    http.get(imgUrl, response => {
      if (response.statusCode !== 200) {
        return reject(`An error happened fetching the remote image. Status Error: ${statusCode}`);
      }
      resolve(response);
    });
  });
};

const saveImageOnDisk = (filePath, response) => {
  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filePath);
    writer.on('error', ({ message }) => {
      return reject(`An error happened during file creation. Details: ${message}`);
    });
    response.pipe(writer);
    resolve();
  });
};

const fetchAndSaveImage = async (imgUrl, targetPath) => {
  let response = await fetchImage(imgUrl);
  let filePath = path.resolve(targetPath, path.basename(imgUrl));
  await saveImageOnDisk(filePath, response);
};

module.exports = fetchAndSaveImage;
