import chalk from 'chalk'
import execa from 'execa'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import Listr from 'listr'
import ncp from 'ncp'
import path from 'path'
import { projectInstall } from 'pkg-install'
import { promisify } from 'util'
const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(from, to) {
  return copy(from, to, {
    clobber: false
  })
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  })

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize Git'))
  }
  return
}

export async function addTemplate() {
  const targetDir = process.cwd()
  const templateDir = path.join(
    path.dirname(require.main.filename),
    '../templates'
  )
  const currentDirName = path.basename(targetDir)

  try {
    const templates = fs.readdirSync(templateDir)

    if (templates.includes(currentDirName)) {
      const { answer } = await inquirer.prompt({
        type: 'confirm',
        name: 'answer',
        message: `Template ${currentDirName} already exists, do you want to overwrite it?`,
        default: true
      })

      if (!answer) {
        console.log(`%s Goodbye!`, chalk.green.bold('DONE'))
        return process.exit(1)
      }
    }

    fs.copySync(targetDir, path.join(templateDir, currentDirName))

    console.log(
      `%s Template ${chalk.cyan(currentDirName)} added succesfully`,
      chalk.green.bold('DONE')
    )
    return true
  } catch (err) {
    console.error(chalk.red.bold('ERROR'), err)
    process.exit(1)
  }
}

export async function installTemplate(options) {
  const targetDir = path.resolve(process.cwd(), options.template.toLowerCase())
  options = {
    ...options,
    targetDirectory: options.targetDirectory || targetDir
  }

  const templateDir = path.join(
    path.dirname(require.main.filename),
    '../templates',
    options.template.toLowerCase()
  )

  options.templateDirectory = templateDir

  try {
    await access(templateDir, fs.constants.R_OK)
  } catch (err) {
    console.log(err)
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }

  console.log('Installing template...')
  await copyTemplateFiles(options.templateDirectory, options.targetDirectory)

  const tasks = new Listr([
    {
      title: 'Copying project files',
      task: () =>
        copyTemplateFiles(options.templateDirectory, options.targetDirectory)
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Installing dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory
        }),
      skip: () =>
        !options.runInstall
          ? 'Pass --install to automatically install dependencies'
          : undefined
    }
  ])

  await tasks.run()

  console.log(`%s Project ${options.template} ready!`, chalk.green.bold('DONE'))
  return true
}
