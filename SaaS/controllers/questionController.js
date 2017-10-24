const fileController = require('./fileController');
const outputFileName = "question.json";
const questionModel = require('../models/questionModel');

const getQuestionById = (id) => {
  return questionModel.findOne({_id : id});
}

const getRandomQuestion = (callback) => {
  questionModel.count().exec((err, count) => {
    let randCount = Math.floor(Math.random() * count);
    questionModel.findOne({}).skip(randCount).exec((err, question) => {
      if (err) {
        callback(err);
      } else {
        callback(null, question);
      }
    });
  });
}

const updateQuestion = (id, answer, callback) => {
  questionModel.findOne({ _id : id }, (err, question) => {
    console.log(question);
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("answer ",answer);
      if (answer === "yes") {
        question.yes = question.yes + 1;
      } else if (answer === "no") {
        question.no = question.no + 1;
      }
      question.save((err, doc) => {
        console.log("updated ",doc);
        callback(null, doc);
      });

    }
  })
}

const addNewQuestion = (question, callback) => {
  let newQuestion = { question };
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
  addNewQuestion,
  updateLikeQuestion
}
