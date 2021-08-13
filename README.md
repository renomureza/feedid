# FeedId - Parser RSS Berita Indonesia

## Instalasi

```
npm i feedid
```

## Contoh

```javascript
const feedid = require('feedid');

feedid.tempo.bisnis().then((res) => {
  console.log(res);
});
```

## Daftar Situs Berita yang Tersedia

1. **Antara** (terbaru, politik, hukum, ekonomi, metro, bola, olahraga, humaniora, lifestyle, hiburan, dunia, tekno, otomotif)
2. **CNBC** (terbaru, investment, news, market, enterpreneur, syariah, tech, lifestyle, opini, profil)
3. **CNN** (terbaru, nasional, internasional, ekonomi, olahraga, teknologi, hiburan, gayaHidup).
4. **JPNN** (terbaru).
5. **Kumparan** (terbaru).
6. **Merdeka** (terbaru, jakarta, dunia, gaya, olahraga, teknologi, otomotif, khas, sehat, jabar, jatim, jateng, sumut)
7. **OkeZone** (terbaru, celebrity, sports, otomotif, economy, techno, lifestyle, bola).
8. **Republika** (terbaru, news, daerah, khazanah, islam, internasional, leisure, bola).
9. **SindoNews** (terbaru, nasional, metro, ekbis, international, daerah, sports, otomotif, tekno, sains, edukasi, lifestyle, kalam).
10. **Suara** (terbaru, bisnis, bola, lifestyle, entertaiment, otomotif, tekno, health).
11. **Tempo** (nasional, bisnis, metro, dunia, bola, cantik, tekno, otomotif, seleb, gaya, travel, difabel, creativelab, inforial, event).
12. **Tribun** (terbaru, bisnis, superskor, sport, seleb, lifestyle, travel, parapuan, otomotif, techno, kesehatan).
13. _comming soon..._
