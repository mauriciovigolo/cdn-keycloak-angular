const fetchAndSaveImage = require('./image-extractor');
const { heroes } = require('./data/dota-heroes.json');

console.log('\n==> Beginning Heroes Images Download');

// Download Hero Images
heroes.forEach(hero => {
  Promise.all([
    fetchAndSaveImage(hero.url_full_portrait, 'public/assets/images/dota-heroes'),
    fetchAndSaveImage(hero.url_small_portrait, 'public/assets/images/dota-heroes'),
    fetchAndSaveImage(hero.url_large_portrait, 'public/assets/images/dota-heroes'),
    fetchAndSaveImage(hero.url_vertical_portrait, 'public/assets/images/dota-heroes')
  ])
    .then(() => {
      console.log(`Hero ${hero.name} images downloaded successfully`);
    })
    .catch(error => {
      console.log(
        `An error happened to download images for hero ${hero.name}. Details: ${error.message}`
      );
    });
});

console.log('\n==> Process finished');
