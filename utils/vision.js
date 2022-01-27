'use strict';

const vision = require('@google-cloud/vision');
const fs = require('fs');
// Creates a client
const productSearchClient = new vision.ProductSearchClient();
const imageAnnotatorClient = new vision.ImageAnnotatorClient();

const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;
const productSetId = process.env.PRODUCTSET_ID;
const productCategory = 'toys-v2';
  
const productSetPath = productSearchClient.productSetPath(
  projectId,
  location,
  productSetId
);

async function getSimilarProductsFile(filePath) {
  const filter = '';
  const content = fs.readFileSync(filePath, 'base64');
  const request = {
    // image: {source: {gcsImageUri: filePath}},
    image: {content: content},
    features: [{type: 'PRODUCT_SEARCH'}],
    imageContext: {
      productSearchParams: {
        productSet: productSetPath,
        productCategories: [productCategory],
        filter: filter,
      },
    },
  };
  const [response] = await imageAnnotatorClient.batchAnnotateImages({
    requests: [request],
  });
  const results = response['responses'][0]['productSearchResults']['results'];
  return results;
}

module.exports = {
  getSimilarProductsFile,
}