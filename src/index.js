import fs from 'fs-extra'
import inquirer from 'inquirer'
import config from './config'
const templates = fs.readdirSync(config.templatesPath)

const questions = [
  {
    type: 'list',
    name: 'name',
    message: 'Select a template',
    choices: templates
  }
]

inquirer.prompt(questions).then(answer => {
  const answered = answer['name']
  console.log(`Generating... ${answered}!`)
  fs.copySync(config.templatesPath + `/${answered}`, `./${answered}`)
  console.log('done!')
})
async function createExpress() {
  // console.log(data)
  // console.log(__dirname)
  // console.log(fs.readdirSync(config.templatesPath + '/express-template'))
  // fs.copy(config.templatesPath, './')
}
createExpress()
