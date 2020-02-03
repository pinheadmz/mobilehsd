'use strict';

const bweb = require('bweb');
const fs = require('bfile');
const Validator = require('bval');
const WSProxy = require('./wsproxy');

const index = fs.readFileSync(`${__dirname}/index.html`);

const proxy = new WSProxy({
  ports: [12038, 13038, 14038, 15038, 44806, 45806, 46806, 47806]
});

const redirect = bweb.server({
  host: '0.0.0.0',
  port: 80,
  sockets: false,
  ssl: false
});

redirect.use(redirect.router());
redirect.get('*', (req, res) => {
  res.redirect('https://easyhandshake.com/');
});

const server = bweb.server({
  host: '0.0.0.0',
  port: 443,
  sockets: false,
  ssl: true,
  keyFile: '/etc/letsencrypt/live/easyhandshake.com/privkey.pem',
  certFile: '/etc/letsencrypt/live/easyhandshake.com/fullchain.pem'
});

server.use(server.router());

server.on('error', (err) => {
  console.error(err.stack);
});

server.get('/', (req, res) => {
  res.send(200, index, 'html');
});

server.get('/favicon.ico', (req, res) => {
  res.send(404);
});

server.get('/:file', (req, res) => {
  const valid = Validator.fromRequest(req);
  const file = valid.str('file');
  res.send(200, getFile(file));
});

proxy.attach(server.http);

redirect.open();
server.open();

function getFile(file) {
  return fs.readFileSync(`${__dirname}/${file}`);
}
