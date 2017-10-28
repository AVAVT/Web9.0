const data = require("../data.json");

const getTestData = () => {
  return data;
};

const checkAnswers = answers => {
  var score = 0;
  for (questionKey in answers) {
    const questionId = parseInt(questionKey.split("_")[1]);
    if(parseInt(answers[questionKey]) === data.questions[questionId].correct) score++;
  }
  return score;
};

const getCorrectAnswers = () => {
    return data.questions.map(
        (question) => ({
            id : question.id,
            correct: question.correct
        })
    );
}

module.exports = { getTestData, checkAnswers, getCorrectAnswers };
