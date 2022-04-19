export default class Quiz
{
  constructor(name)
  {
    this.name = name;
    this.questions = [];
    this.answers = [];
  }

  addQuestion(Question, Answer)
  {
    this.questions.push(Question)
    this.answers.push(Answer)
  }

  getName()
  {
    return this.name;
  }
  
}