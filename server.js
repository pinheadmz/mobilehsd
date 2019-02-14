'use strict';

const bweb = require('bweb');
const fs = require('bfile');
const Validator = require('bval');

const index = fs.readFileSync(`${__dirname}/index.html`);

const server = bweb.server({
  host: '0.0.0.0',
  port: 8080,
  sockets: false,
  ssl: false
});

server.use(server.router());

server.on('error', (err) => {
  console.error(err.stack);
});

server.get('/', (req, res) => {
  res.send(200, index, 'html');
});

server.get('/:file', (req, res) => {
  const valid = Validator.fromRequest(req);
  const file = valid.str('file');
  res.send(200, getFile(file));
});

server.open();

function getFile(file){
  return fs.readFileSync(`${__dirname}/${file}`)
}