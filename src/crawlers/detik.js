const { default: axios } = require('axios');
const cheerio = require('cheerio');
const crawler = require('../utils/crawler');
const responseCreator = require('../utils/responseCreator');
const xmlParser = require('../utils/xmlParser');

const contentParser = async (link, wrapperTag, withContent) => {
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);

  let content = null;

  if (withContent) {
    content = $(wrapperTag).children('p').text().trim();
  }

  const thumbnail = $('.detail__media-image').find('img').attr('src');

  return {
    content,
    thumbnail,
  };
};

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
      pubDate: [pubDate],
      'content:encoded': [contentEncoded],
    } = item[i];

    const { content, thumbnail } = await contentParser(
      link,
      '.detail__body-text',
      withContent
    );

    posts.push({
      title: title,
      description: contentEncoded,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail:
        thumbnail?.replace('w=700', 'w=1280').replace('q=90', 'q=720') || null,
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
    crawler('https://news.detik.com/rss', responseParser, withContent),
  finance: (withContent) =>
    crawler('https://finance.detik.com/rss', responseParser, withContent),
  hot: (withContent) =>
    crawler('https://hot.detik.com/rss', responseParser, withContent),
  inet: (withContent) =>
    crawler('https://inet.detik.com/rss', responseParser, withContent),
  sport: (withContent) =>
    crawler('https://sport.detik.com/rss', responseParser, withContent),
  oto: (withContent) =>
    crawler('https://oto.detik.com/rss', responseParser, withContent),
  travel: (withContent) =>
    crawler('https://travel.detik.com/rss', responseParser, withContent),
  food: (withContent) =>
    crawler('https://food.detik.com/rss', responseParser, withContent),
  health: (withContent) =>
    crawler('https://health.detik.com/rss', responseParser, withContent),
  wolipop: (withContent) =>
    crawler('https://wolipop.detik.com/rss', responseParser, withContent),
};
