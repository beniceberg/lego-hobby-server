// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();
const bucket = storage.bucket(process.env.GCS_BUCKET);

async function uploadFile(sourceFilePath, destFilePath) {
  
  await bucket.upload(sourceFilePath, {
    destination: destFilePath,
  });

  console.log(`${sourceFilePath} uploaded to ${process.env.GCS_BUCKET}`);
}

module.exports = {
  uploadFile,
}