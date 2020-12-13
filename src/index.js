import fs from 'fs-extra'
import inquirer from 'inquirer'
import getQuestions from '../questions'
import config from './config'

const templates = fs.readdirSync(config.templatesPath)

const questions = getQuestions(templates)

inquirer.prompt(questions).then(answer => {
  const answered = answer['name']
  console.log(`Generating... ${answered}!`)
  fs.copy(config.templatesPath + `/${answered}`, `./${answered}`)
  console.log('done!')
})

// console.log(data)
// console.log(__dirname)
// console.log(fs.readdirSync(config.templatesPath + '/express-template'))
// fs.copy(config.templatesPath, './')
