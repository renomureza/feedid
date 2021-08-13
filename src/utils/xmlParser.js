const xml2js = require('xml2js');

const xmlParser = async (xml) => {
  const {
    rss: { channel },
  } = await xml2js.parseStringPromise(xml, {
    trim: true,
    explicitArray: false,
    attrkey: false,
    mergeAttrs: true,
    normalize: true,
  });

  return channel;
};

module.exports = xmlParser;
