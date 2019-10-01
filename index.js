const fetch = require('isomorphic-unfetch');
const parse5 = require('parse5');

const imageWrapperIds = [
  'img-canvas',
  'imgTagWrapperId',
  'digitalMusicProductImage_feature_div',
]

const searchTree = (node, targetIds) => {
  const targetWrapper = node.childNodes && node.childNodes.find(_node => _node.attrs && _node.attrs.some(attr => attr.name === 'id' && targetIds.indexOf(attr.value) >= 0));
  if (targetWrapper) {
    return targetWrapper;
  } else if (node.childNodes != null) {
    let i;
    let result = null;
    for (let i = 0; result == null && i < node.childNodes.length; i += 1){
      result = searchTree(node.childNodes[i], targetIds);
    }
    return result;
  }
  return null;
}

const amazonMetadataParser = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Content-type': 'text/html',
      }
    })
      .then(response => response.text())
      .then((html) => {
        const document = parse5.parse(html);

        const imageWrapper = searchTree(document, imageWrapperIds);
        const image = imageWrapper.childNodes.find(node => node.tagName === 'img');

        resolve({
          title: image.attrs.find(attr => attr.name === 'alt').value,
          image: image.attrs.find(attr => attr.name === 'src').value
        });
      }).catch(reject);
  });
}

module.exports = amazonMetadataParser;
