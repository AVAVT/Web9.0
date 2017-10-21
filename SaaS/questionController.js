const fileController = require('./fileController');
const outputFileName = "question.json";

const getQuestionList = () => {
  let questionList = fileController.readDataFromFile(outputFileName);
  return questionList;
}

const saveQuestionList = (questionList) => {
  fileController.writeDataToFile(outputFileName, questionList);
}

const getQuestionById = (id) => {
  let questionList = getQuestionList();
  return questionList[id];
}

const getRandomQuestion = () => {
  let questionList = getQuestionList();
  let randomId = Math.floor(Math.random() * questionList.length);
  let question = questionList[randomId];
  question.id =randomId;

  return question;
}

const updateQuestion = (id, answer) => {
  let questionList = getQuestionList();

  if (answer === "yes") {
    questionList[id].yes += 1;
  } else if (answer === "no") {
    questionList[id].no += 1;
  }

  saveQuestionList(questionList);
}

const addNewQuestion = (question) => {
  let newQuestion = {
    question,
    yes: 0,
    no: 0
  }
  let questionList = [];

  try {
    questionList = getQuestionList();
  } catch (ex) {
    console.log(ex);
  }
  questionList.push(newQuestion);

  saveQuestionList(questionList);

  return questionList.length - 1;
}

module.exports = {
  getQuestionById,
  getRandomQuestion,
  getQuestionById,
  getRandomQuestion,
  updateQuestion,
  addNewQuestion
}
