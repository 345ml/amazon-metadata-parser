const fetch = require('isomorphic-unfetch');
const parse5 = require('parse5');

const amazonMetadataParser = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.text())
      .then((html) => {
        const document = parse5.parse(html);
        let product = document.childNodes
          .find(node => node.tagName === 'html')
          .childNodes.find(node => node.tagName === 'body')
          .childNodes.find(node => node.attrs.some(attr => attr.name === 'id' && attr.value === 'a-page'))

        let image;

        if (product.childNodes.some(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'dp'))) {
          product = product.childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'dp'))
          .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'dp-container'))
          .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'ppd'))

          image = product.childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'leftCol'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'imageBlock_feature_div'))
            .childNodes.find(node => node.attrs && node.attrs.find(attr => attr.name === 'id' && attr.value === 'imageBlock'))
            .childNodes.find(node => node.tagName === 'div')
            .childNodes.find(node => node.tagName === 'div')
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-text-center a-fixed-left-grid-col a-col-right'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value.match(/canvas/)))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'main-image-container'))
            .childNodes.find(node => node.tagName === 'ul')
            .childNodes.find(node => node.tagName === 'li')
            .childNodes.find(node => node.tagName === 'span')
            .childNodes.find(node => node.tagName === 'span')
            .childNodes.find(node => node.tagName === 'div')
            .childNodes.find(node => node.tagName === 'img')
        } else if (product.childNodes.some(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value.match(/DigitalMusicDetailPage/) && attr.value.match(/PrimeMusic/)))) {
          // Digital music
          product = product.childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value.match(/DigitalMusicDetailPage/) && attr.value.match(/PrimeMusic/)))
          .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'divsinglecolumnminwidth'))
          .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'ppd'))

          image = product.childNodes.find(node => node.attrs && !node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-row'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-fixed-right-grid a-spacing-large'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-fixed-right-grid-inner'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-fixed-right-grid-col a-col-left'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'class' && attr.value === 'a-row a-grid-vertical-align a-grid-top a-ws-row'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'ppd-left'))
            .childNodes.find(node => node.attrs && node.attrs.some(attr => attr.name === 'id' && attr.value === 'digitalMusicProductImage_feature_div'))
            .childNodes.find(node => node.tagName === 'img')
        }

        resolve({
          title: image.attrs.find(attr => attr.name === 'alt').value,
          image: image.attrs.find(attr => attr.name === 'src').value
        });
      }).catch(reject);
  });
}

module.exports = amazonMetadataParser;
