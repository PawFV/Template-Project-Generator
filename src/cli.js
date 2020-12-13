import arg from 'arg'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import config from './config'
import { createProject } from './main'

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {   
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install'
    },
    {
      argv: rawArgs.slice(2)
    }
  )
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false
  }
}

async function promptForMissingOptions(options) {
  const defaultTemplate = 'vue2-ts'
  if (options.skipPrompts) {
    return { ...options, template: options.template || defaultTemplate }
  }

  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: fs.readdirSync(config.templatesPath)
    })
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a Git repository?',
      default: false
    })
  }

  const answers = await inquirer.prompt(questions)
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promptForMissingOptions(options)
  console.log('TCL: cli -> options', options)
  await createProject(options)
}