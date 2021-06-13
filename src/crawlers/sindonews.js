const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');

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
      'media:content': [mediaContent],
    } = item[i];

    let content = null;

    if (withContent) {
      content = await contentParser(link, '#content', false);
    }

    posts.push({
      title: title,
      description: description,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: mediaContent.$.url,
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
    crawler('https://www.sindonews.com/rss', responseParser, withContent),
  nasional: (withContent) =>
    crawler('https://nasional.sindonews.com/rss', responseParser, withContent),
  metro: (withContent) =>
    crawler('https://metro.sindonews.com/rss', responseParser, withContent),
  ekbis: (withContent) =>
    crawler('https://ekbis.sindonews.com/rss', responseParser, withContent),
  international: (withContent) =>
    crawler(
      'https://international.sindonews.com/rss',
      responseParser,
      withContent
    ),
  daerah: (withContent) =>
    crawler('https://daerah.sindonews.com/rss', responseParser, withContent),
  sports: (withContent) =>
    crawler('https://sports.sindonews.com/rss', responseParser, withContent),
  otomotif: (withContent) =>
    crawler('https://otomotif.sindonews.com/rss', responseParser, withContent),
  tekno: (withContent) =>
    crawler('https://tekno.sindonews.com/rss', responseParser, withContent),
  sains: (withContent) =>
    crawler('https://sains.sindonews.com/rss', responseParser, withContent),
  edukasi: (withContent) =>
    crawler('https://edukasi.sindonews.com/rss', responseParser, withContent),
  lifestyle: (withContent) =>
    crawler('https://lifestyle.sindonews.com/rss', responseParser, withContent),
  kalam: (withContent) =>
    crawler('https://kalam.sindonews.com/rss', responseParser, withContent),
};
