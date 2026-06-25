const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

const questionsPath = path.join(__dirname, '../data/errorQuestions.json');
const progressPath = path.join(__dirname, '../data/errorProgress.json');

async function readQuestions() {
  const raw = await fs.readFile(questionsPath, 'utf8');
  return JSON.parse(raw);
}

async function ensureProgress() {
  try {
    await fs.access(progressPath);
  } catch {
    await fs.writeFile(progressPath, JSON.stringify({ submissions: [] }, null, 2), 'utf8');
  }
}

async function readProgress() {
  await ensureProgress();
  const raw = await fs.readFile(progressPath, 'utf8');
  return JSON.parse(raw);
}

async function writeProgress(data) {
  await fs.writeFile(progressPath, JSON.stringify(data, null, 2), 'utf8');
}

function calculateStats(submissions, totalQuestionsCount) {
  const totalAttempts = submissions.length;
  const correctAttempts = submissions.filter((s) => s.isCorrect).length;
  
  // Unique question IDs completed (attempted/submitted at least once)
  const completedQuestionIds = new Set(
    submissions.map((s) => s.questionId)
  );

  const totalCompleted = completedQuestionIds.size;
  const progressPercentage = totalQuestionsCount > 0 
    ? Math.round((totalCompleted / totalQuestionsCount) * 100) 
    : 0;
  const accuracyPercentage = totalAttempts > 0 
    ? Math.round((correctAttempts / totalAttempts) * 100) 
    : 0;

  return {
    totalCompleted,
    totalAttempts,
    correctAttempts,
    progressPercentage,
    accuracyPercentage,
    totalQuestionsCount
  };
}

// Get all questions
router.get('/questions', async (req, res, next) => {
  try {
    const questions = await readQuestions();
    res.json(questions);
  } catch (error) {
    next(error);
  }
});

// Get user progress & stats
router.get('/progress', async (req, res, next) => {
  try {
    const [questions, progress] = await Promise.all([readQuestions(), readProgress()]);
    const stats = calculateStats(progress.submissions, questions.length);
    
    const completedQuestions = Array.from(new Set(
      progress.submissions.map((s) => s.questionId)
    ));

    res.json({
      stats,
      completedQuestions,
      submissions: progress.submissions
    });
  } catch (error) {
    next(error);
  }
});

// Submit answer for a question
router.post('/submit', async (req, res, next) => {
  try {
    const { questionId, answer } = req.body;
    if (!questionId || answer === undefined) {
      return res.status(400).json({ message: 'Missing questionId or answer' });
    }

    const [questions, progress] = await Promise.all([readQuestions(), readProgress()]);
    const question = questions.find((q) => q.id === questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = question.correctAnswer === answer;
    
    // Log submission
    const newSubmission = {
      _id: crypto.randomUUID(),
      questionId,
      selectedAnswer: answer,
      isCorrect,
      submittedAt: new Date().toISOString()
    };
    
    progress.submissions.push(newSubmission);
    await writeProgress(progress);

    const stats = calculateStats(progress.submissions, questions.length);
    const completedQuestions = Array.from(new Set(
      progress.submissions.map((s) => s.questionId)
    ));

    res.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      stats,
      completedQuestions
    });
  } catch (error) {
    next(error);
  }
});

// Reset progress
router.post('/reset', async (req, res, next) => {
  try {
    await writeProgress({ submissions: [] });
    const questions = await readQuestions();
    const stats = calculateStats([], questions.length);
    res.json({
      message: 'Progress reset successfully',
      stats,
      completedQuestions: [],
      submissions: []
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
