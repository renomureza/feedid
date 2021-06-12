const contentParser = require('../utils/contentParser');
const xmlParser = require('../utils/xmlParser');
const crawler = require('../utils/crawler');

const responseParser = async (xml) => {
  const channel = await xmlParser(xml);
  const data = [];

  for (let i = 0; i < channel[0].item.length; i++) {
    const content = await contentParser(
      channel[0].item[i].link[0],
      '.detail_text'
    );

    data.push({
      title: channel[0].item[i].title[0],
      description: channel[0].item[i]['content:encoded'][0],
      pubDate: new Date(channel[0].item[i].pubDate[0]).toISOString(),
      link: channel[0].item[i].link[0],
      thumbnail: channel[0].item[i].enclosure[0].$.url
        .replace('360', '1280')
        .replace('90', '720'),
      content,
    });
  }

  return {
    title: channel[0].title[0],
    description: channel[0].description[0],
    link: channel[0].link[0],
    image: {
      title: channel[0].image[0].title[0],
      url: channel[0].image[0].url[0],
    },
    posts: data,
  };
};

module.exports = {
  terbaru: () => crawler('https://www.cnbcindonesia.com/rss', responseParser),
  investment: () =>
    crawler('https://www.cnbcindonesia.com/investment/rss', responseParser),
  news: () => crawler('https://www.cnbcindonesia.com/news/rss', responseParser),
  market: () =>
    crawler('https://www.cnbcindonesia.com/market/rss', responseParser),
  entrepreneur: () =>
    crawler('https://www.cnbcindonesia.com/entrepreneur/rss', responseParser),
  syariah: () =>
    crawler('https://www.cnbcindonesia.com/syariah/rss', responseParser),
  tech: () => crawler('https://www.cnbcindonesia.com/tech/rss', responseParser),
  lifestyle: () =>
    crawler('https://www.cnbcindonesia.com/lifestyle/rss', responseParser),
  opini: () =>
    crawler('https://www.cnbcindonesia.com/opini/rss', responseParser),
  profil: () =>
    crawler('https://www.cnbcindonesia.com/profil/rss', responseParser),
};
