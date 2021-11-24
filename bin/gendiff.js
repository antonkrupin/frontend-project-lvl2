#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program
    .option('-d, --debug', 'output extra');
console.log('test');