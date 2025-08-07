const mongoose = require('mongoose');

const chatAnswerSchema = new mongoose.Schema({
  answers: { type: Object, required: true },
  submittedAt: { type: Date, default: Date.now }
});

const ChatAnswer = mongoose.model('ChatAnswer', chatAnswerSchema, 'ChatAnswers');

module.exports = ChatAnswer;
