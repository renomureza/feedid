# FeedId - Parser RSS Berita Indonesia

## Instalasi

```
npm i feedid
```

## Contoh

```javascript
const feedid = require('feedid');

feedid.tempo
  .bisnis()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Daftar Situs Berita yang Tersedia

_Diurutkan berdasarkan abjad._

1. **CNBC** (terbaru, investment, news, market, enterpreneur, syariah, tech, lifestyle, opini, profil)
2. **CNN** (terbaru, nasional, internasional, ekonomi, olahraga, teknologi, hiburan, gayahidup).
3. **Detik** (terbaru, finance, hot, inet, sport, oto, travel, food, health, wolipop).
4. **Kumparan** (terbaru).
5. **Merdeka** (terbaru, jakarta, dunia, gaya, olahraga, teknologi, otomotif, khas, sehat, jabar, jatim, jateng, sumut)
6. **OkeZone** (terbaru, celebrity, nasional, megapolitan, sports, otomotif, economy, techno, lifestyle, travel, bola).
7. **SindoNews** (terbaru, nasional, metro, ekbis, internasional, daerah, sports, otomotif, tekno, sains, edukasi, lifestyle, kalam).
8. **Suara** (terbaru, bisnis, bola, lifestyle, entertaiment, otomotif, tekno, helath).
9. **Tempo** (nasional, bisnis, metro, dunia, bola, cantik, tekno, otomotif, seleb, gaya, travel, difabel, creativelab, inforial, event).
10. _comming soon..._
