const crawler = require('../utils/crawler');
const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
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
      enclosure: [enclosure],
    } = item[i];

    let content = null;

    if (withContent) {
      content = await contentParser(link, 'article');
    }

    posts.push({
      title: title,
      description: description.split('\n')[1].trim(),
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
    crawler('https://www.suara.com/rss', responseParser, withContent),
  bisnis: (withContent) =>
    crawler('https://www.suara.com/rss/bisnis', responseParser, withContent),
  bola: (withContent) =>
    crawler('https://www.suara.com/rss/bola', responseParser, withContent),
  lifestyle: (withContent) =>
    crawler('https://www.suara.com/rss/lifestyle', responseParser, withContent),
  entertainment: (withContent) =>
    crawler(
      'https://www.suara.com/rss/entertainment',
      responseParser,
      withContent
    ),
  otomotif: (withContent) =>
    crawler('https://www.suara.com/rss/otomotif', responseParser, withContent),
  tekno: (withContent) =>
    crawler('https://www.suara.com/rss/tekno', responseParser, withContent),
  health: (withContent) =>
    crawler('https://www.suara.com/rss/health', responseParser, withContent),
};
