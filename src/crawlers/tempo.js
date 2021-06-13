const contentParser = require('../utils/contentParser');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml, withContent) => {
  const channel = await xmlParser(xml);

  const {
    item,
    title: [title],
    description: [description],
    link: [link],
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      img: [img],
    } = item[i];

    let content = null;
    if (withContent) {
      content = await contentParser(link, '#isi');
    }

    posts.push({
      title: title,
      description: description,
      pubDate: null,
      link: link,
      thumbnail: img,
      content,
    });
  }

  return responseCreator({
    data: {
      title: title,
      description: description,
      link: link,
      image: {
        title: title,
        url: 'https://www.tempo.co/images/logo-tempo.png',
      },
      posts,
    },
  });
};

module.exports = {
  nasional: (withContent) =>
    crawler('https://rss.tempo.co/nasional', responseParser, withContent),
  bisnis: (withContent) =>
    crawler('https://rss.tempo.co/bisnis', responseParser, withContent),
  metro: (withContent) =>
    crawler('https://rss.tempo.co/metro', responseParser, withContent),
  dunia: (withContent) =>
    crawler('https://rss.tempo.co/dunia', responseParser, withContent),
  bola: (withContent) =>
    crawler('https://rss.tempo.co/bola', responseParser, withContent),
  cantik: (withContent) =>
    crawler('https://rss.tempo.co/cantik', responseParser, withContent),
  tekno: (withContent) =>
    crawler('https://rss.tempo.co/tekno', responseParser, withContent),
  otomotif: (withContent) =>
    crawler('https://rss.tempo.co/otomotif', responseParser, withContent),
  seleb: (withContent) =>
    crawler('https://rss.tempo.co/seleb', responseParser, withContent),
  gaya: (withContent) =>
    crawler('https://rss.tempo.co/gaya', responseParser, withContent),
  travel: (withContent) =>
    crawler('https://rss.tempo.co/travel', responseParser, withContent),
  difabel: (withContent) =>
    crawler('https://rss.tempo.co/difabel', responseParser, withContent),
  creativelab: (withContent) =>
    crawler('https://rss.tempo.co/creativelab', responseParser, withContent),
  inforial: (withContent) =>
    crawler('https://rss.tempo.co/inforial', responseParser, withContent),
  event: (withContent) =>
    crawler('https://rss.tempo.co/event', responseParser, withContent),
};
