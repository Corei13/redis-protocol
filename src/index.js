#! /usr/bin/env node

import fs from 'fs';
import readline from 'readline';
import commander from 'commander';
import { underline, bold } from 'chalk';

import { encode } from './redis-protocol';

commander
  .usage(`[${bold('-o')}] [${underline('file')}]`)
  .description(`${bold('redis-protocol')} reads sequence of redis commands from a file and writes encoded redis protocol to the standard output. If ${underline('file')} is absent, ${bold('redis-protocol')} reads from the standard input.`)
  .option('-o, --output <file>', 'if present, writes output into <file> instead of standard output')
  .parse(process.argv);

const { args: [inputFile], output: outputFile } = commander;

const lineReader = readline.createInterface({
  input: inputFile ? fs.createReadStream(inputFile, { autoClose: true }) : process.stdin,
  output: outputFile ? fs.createWriteStream(outputFile, { autoClose: true }) : process.stdout,
  terminal: false
});

lineReader.on('line', line => {
  encode(line).forEach(buffer => lineReader.output.write(`${buffer}\r\n`));
});
