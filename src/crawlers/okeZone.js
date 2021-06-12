const { default: axios } = require('axios');
const cheerio = require('cheerio');
const crawler = require('../utils/crawler');
const xmlParser = require('../utils/xmlParser');

const contentParser = async (link, wrapperTag) => {
  const { data } = await axios.get(link, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    },
  });
  const $ = cheerio.load(data);
  const content = $(wrapperTag).children('p').text().trim();
  const thumbnail = $('#imgCheck').attr('src');
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
    item,
  } = channel[0];

  const posts = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      pubDate: [pubDate],
    } = item[i];

    const { content, thumbnail } = await contentParser(link, '#contentx');

    posts.push({
      title: title,
      description: description,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail,
      content,
    });
  }

  return {
    title: title,
    description: description,
    link: link,
    image: {
      title: title,
      url: 'https://cdn.okezone.com/underwood/revamp/2020/img/xokezone2020.png.pagespeed.ic.o1H1D1nrFk.png',
    },
    posts,
  };
};

module.exports = {
  terbaru: () => crawler('https://news.okezone.com/rss', responseParser),
  celebrity: () => crawler('https://celebrity.okezone.com/rss', responseParser),
  nasional: () => crawler('https://nasional.okezone.com/rss', responseParser),
  megapolitan: () =>
    crawler('https://megapolitan.okezone.com/rss', responseParser),
  sports: () => crawler('https://sports.okezone.com/rss', responseParser),
  otomotif: () => crawler('https://otomotif.okezone.com/rss', responseParser),
  economy: () => crawler('https://economy.okezone.com/rss', responseParser),
  techno: () => crawler('https://techno.okezone.com/rss', responseParser),
  lifestyle: () => crawler('https://lifestyle.okezone.com/rss', responseParser),
  travel: () => crawler('https://travel.okezone.com/rss', responseParser),
  bola: () => crawler('https://bola.okezone.com/rss', responseParser),
};
