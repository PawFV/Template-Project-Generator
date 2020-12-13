function getQuestions(templates) {
  const questions = [
    {
      type: 'list',
      name: 'name',
      message: 'Select a template',
      choices: templates
    }
  ]
  return questions
}

export default getQuestions
