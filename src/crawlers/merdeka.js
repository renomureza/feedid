const contentParser = require('../utils/contentParser');
const crawler = require('../utils/crawler');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml) => {
  const channel = await xmlParser(xml);

  const {
    title: [title],
    description: [description],
    link: [link],
    image: [image],
    item,
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      pubDate: [pubDate],
      enclosure: [enclosure],
    } = item[i];

    const content = await contentParser(
      link + '?page=all',
      '.mdk-body-paragraph'
    );

    const [, dsc] = description.split('/>');

    posts.push({
      title: title,
      description: dsc,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: enclosure.$.url,
      content,
    });
  }

  return {
    title: title,
    description: description,
    link: link,
    image: {
      title: image.title[0],
      url: image.url[0],
    },
    posts,
  };
};

module.exports = {
  terbaru: () => crawler('https://www.merdeka.com/feed/', responseParser),
  jakarta: () =>
    crawler('https://www.merdeka.com/feed/jakarta', responseParser),
  dunia: () => crawler('https://www.merdeka.com/feed/dunia', responseParser),
  gaya: () => crawler('https://www.merdeka.com/feed/gaya', responseParser),
  olahraga: () =>
    crawler('https://www.merdeka.com/feed/olahraga', responseParser),
  teknologi: () =>
    crawler('https://www.merdeka.com/feed/teknologi', responseParser),
  otomotif: () =>
    crawler('https://www.merdeka.com/feed/otomotif', responseParser),
  khas: () => crawler('https://www.merdeka.com/feed/khas', responseParser),
  sehat: () => crawler('https://www.merdeka.com/feed/sehat', responseParser),
  jabar: () => crawler('https://www.merdeka.com/feed/jabar', responseParser),
  jatim: () => crawler('https://www.merdeka.com/feed/jatim', responseParser),
  jateng: () => crawler('https://www.merdeka.com/feed/jateng', responseParser),
  sumut: () => crawler('https://www.merdeka.com/feed/sumut', responseParser),
};
