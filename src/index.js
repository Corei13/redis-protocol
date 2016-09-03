#! /usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import { argv } from 'yargs';

import { encode } from './redis-protocol';

const { i: inputfile, o: outputfile, h: help } = argv;

if (help) {
  console.log('USAGE: redis-protocol [-i inputfile] [-o outputfile]');
  process.exit(0);
}

const lineReader = readline.createInterface({
  input: inputfile ? fs.createReadStream(inputfile) : process.stdin,
  output: outputfile ? fs.createWriteStream(outputfile, { autoClose: true }) : process.stdout,
  terminal: false
});

lineReader.on('line', line => {
  encode(line).forEach(buffer => lineReader.output.write(`${buffer}\r\n`));
});
