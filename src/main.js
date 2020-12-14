import chalk from 'chalk'
import execa from 'execa'
import fs from 'fs-extra'
import Listr from 'listr'
import ncp from 'ncp'
import path from 'path'
import { projectInstall } from 'pkg-install'
import { promisify } from 'util'
const access = promisify(fs.access)
const copy = promisify(ncp)

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
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

export async function createProject(options) {
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
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }

  console.log('Copy project files')
  await copyTemplateFiles(options)

  const tasks = new Listr([
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
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

  console.log('%s Project ready', chalk.green.bold('DONE'))
  return true
}
