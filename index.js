const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('title', 'CDN for keycloak-angular');
app.set('x-powered-by', false);

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public/404.html'));
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

app.listen(4200, () => console.log('App working on 4200'));
