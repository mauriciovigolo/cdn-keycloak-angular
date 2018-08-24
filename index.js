#!/usr/bin/env node

/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/cdn-keycloak-angular/LICENSE
 */

const express = require('express');
const app = express();
const path = require('path');

// Settings
app.set('title', 'CDN for keycloak-angular');
app.set('x-powered-by', false);

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public/404.html'));
    return;
  }

  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

app.listen(4200, () => console.log('App working on 4200'));
