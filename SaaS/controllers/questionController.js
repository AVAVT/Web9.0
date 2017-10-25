const questionModel = require('../models/questionModel');
//Just some comment to test
const getQuestionById = (id) => {
  return questionModel.findOne({_id : id});
}

const getRandomQuestion = (callback) => {
  questionModel.find({}, (err, questionList) => {
    let randomId = Math.floor(Math.random() * questionList.length);
    let question = questionList[randomId];
    question.id = randomId;

    callback(question);
  });
}

const updateQuestion = (id, answer) => {
  getQuestionById(id)
  .then((question) => {
    if (answer === "yes") {
      question.yes += 1;
    } else if (answer === "no") {
      question.no += 1;
    }

    question.save(function (err, question) {
      if (err) return console.error(err);
    });
  });
}

const addNewQuestion = (question, callback) => {
  let newQuestion = { question }
  questionModel.create(newQuestion, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const updateLikeQuestion = (id, callback) => {
  questionModel.findOne({ _id : id }, (err, question) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      question.likes += 1;
      question.save((err, doc) => {
        callback(null, question);
      });
    }
  })
}

module.exports = {
  getQuestionById,
  getRandomQuestion,
  getQuestionById,
  getRandomQuestion,
  updateQuestion,
  addNewQuestion
  updateLikeQuestion
}
