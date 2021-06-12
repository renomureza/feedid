const { default: axios } = require('axios');
const cheerio = require('cheerio');
const crawler = require('../utils/crawler');
const xmlParser = require('../utils/xmlParser');

const contentParser = async (link, wrapperTag) => {
  const { data } = await axios.get(link);
  const $ = cheerio.load(data);
  const content = $(wrapperTag).children('p').text().trim();
  const thumbnail = $('.detail__media-image').find('img').attr('src');
  return {
    content,
    thumbnail,
  };
};

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
      pubDate: [pubDate],
      'content:encoded': [contentEncoded],
    } = item[i];

    const { content, thumbnail } = await contentParser(
      link,
      '.detail__body-text'
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
  terbaru: () => crawler('https://news.detik.com/rss', responseParser),
  finance: () => crawler('https://finance.detik.com/rss', responseParser),
  hot: () => crawler('https://hot.detik.com/rss', responseParser),
  inet: () => crawler('https://inet.detik.com/rss', responseParser),
  sport: () => crawler('https://sport.detik.com/rss', responseParser),
  oto: () => crawler('https://oto.detik.com/rss', responseParser),
  travel: () => crawler('https://travel.detik.com/rss', responseParser),
  food: () => crawler('https://food.detik.com/rss', responseParser),
  helath: () => crawler('https://health.detik.com/rss', responseParser),
  wolipop: () => crawler('https://wolipop.detik.com/rss', responseParser),
};
