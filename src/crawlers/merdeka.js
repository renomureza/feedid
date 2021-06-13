const contentParser = require('../utils/contentParser');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml, withContent) => {
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

    let content = null;

    if (withContent) {
      content = await contentParser(link + '?page=all', '.mdk-body-paragraph');
    }

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

  return responseCreator({
    data: {
      title: title,
      description: description,
      link: link,
      image: {
        title: image.title[0],
        url: image.url[0],
      },
      posts,
    },
  });
};

module.exports = {
  terbaru: (withContent) =>
    crawler('https://www.merdeka.com/feed/', responseParser, withContent),
  jakarta: (withContent) =>
    crawler(
      'https://www.merdeka.com/feed/jakarta',
      responseParser,
      withContent
    ),
  dunia: (withContent) =>
    crawler('https://www.merdeka.com/feed/dunia', responseParser, withContent),
  gaya: (withContent) =>
    crawler('https://www.merdeka.com/feed/gaya', responseParser, withContent),
  olahraga: (withContent) =>
    crawler(
      'https://www.merdeka.com/feed/olahraga',
      responseParser,
      withContent
    ),
  teknologi: (withContent) =>
    crawler(
      'https://www.merdeka.com/feed/teknologi',
      responseParser,
      withContent
    ),
  otomotif: (withContent) =>
    crawler(
      'https://www.merdeka.com/feed/otomotif',
      responseParser,
      withContent
    ),
  khas: (withContent) =>
    crawler('https://www.merdeka.com/feed/khas', responseParser, withContent),
  sehat: (withContent) =>
    crawler('https://www.merdeka.com/feed/sehat', responseParser, withContent),
  jabar: (withContent) =>
    crawler('https://www.merdeka.com/feed/jabar', responseParser, withContent),
  jatim: (withContent) =>
    crawler('https://www.merdeka.com/feed/jatim', responseParser, withContent),
  jateng: (withContent) =>
    crawler('https://www.merdeka.com/feed/jateng', responseParser, withContent),
  sumut: (withContent) =>
    crawler('https://www.merdeka.com/feed/sumut', responseParser, withContent),
};
