'use strict';

 /* eslint-env node, es6 */
 
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
require('dotenv').config()

const { getSimilarProductsFile } = require('./utils/vision');
const { uploadFile } = require('./utils/storage');

const tempFolder = '/tmp';
const upload = multer({
  dest: tempFolder,
  type: Buffer
});

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('upload'), async (req, res) => {
  console.log('local file', req.file.filename);
  const sourceFilePath = `${tempFolder}/${req.file.filename}`;
  const destFilePath = `search/images/${req.file.filename}.jpg`;
  await uploadFile(sourceFilePath, destFilePath);
  const result = await getSimilarProductsFile(sourceFilePath);

  res.json(result);
});

const port = process.env.PORT;

app.listen(port, () => console.log('Server live at http://localhost:%s/', port));
