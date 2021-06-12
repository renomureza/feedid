const cheerio = require('cheerio');
const crawler = require('../utils/crawler');
const xmlParser = require('../utils/xmlParser');

const responseParser = async (xml) => {
  const channel = await xmlParser(xml);

  const {
    title: [title],
    link: [link],
    image: [image],
    item,
  } = channel[0];

  const data = [];

  for (let i = 0; i < item.length; i++) {
    const {
      link: [link],
      title: [title],
      description: [description],
      pubDate: [pubDate],
      'content:encoded': [contentEncoded],
      enclosure: [enclosure],
    } = item[i];

    const $ = cheerio.load(contentEncoded);
    const content = $('p').text().trim();

    data.push({
      title: title,
      description: description,
      pubDate: new Date(pubDate).toISOString(),
      link: link,
      thumbnail: enclosure.$.url.replace('w_480', 'w_1280'),
      content,
    });
  }

  return {
    title: title,
    description:
      'kumparan.com adalah platform media berita kolaboratif, terkini Indonesia hari ini yang menyajikan informasi news, sepak bola, ekonomi, politik, showbiz, lifestyle, otomotif, tekno dan travel',
    link: link,
    image: {
      title: image.title[0],
      url: image.url[0],
    },
    posts: data,
  };
};

module.exports = {
  terbaru: () => crawler('https://lapi.kumparan.com/v3.0/rss/', responseParser),
};
