# amazon-metadata-parser

## Motivation

This is a Node.js library created for my blog.

Amazon's Product Advertising API is strict.
The goal is to get product photos and titles and display them in the blog text without using the API.

## Get start

### Install
```
yarn add amazon-metadata-parser
```

### How to use
``` javascript
const amazonMetadataParser = require('amazon-metadata-parser');

amazonMetadataParser('https://www.amazon.com/Let-Be-Beatles/dp/B01929IA56/').then((metadata) => {
  console.log(metadata);
  /**
  * Response
  * {
  *   title: 'Let It Be',
  *   image: 'IMAGE_URL',
  * }
  */
}).catch((error) => {
  throw error;
});
```
