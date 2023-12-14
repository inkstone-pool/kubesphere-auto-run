#!/usr/bin/env node
import { Command } from 'commander'

import packageJSON from '../package.json' assert { type: 'json' }
import { handleGenerateConfig } from './init.js'
const program = new Command()
program
  .name('kubesphere-util')
  .description('generate some config to operation kubesphere')
  .version(packageJSON.version, '-v, --vers', 'output the current version')
program
  .option('--init')
  .description('init kubesphereconfig.json')
  // .argument('<string>', 'string to split')
  // .option('--first', 'display just the first substring')
  // .option('-s, --separator <char>', 'separator character', ',')
  .action(() => {
    handleGenerateConfig()
  })
program.parse()
