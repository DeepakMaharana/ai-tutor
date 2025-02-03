import React, { useState } from 'react';

const QuizSection = ({ quizQuestions, onQuizComplete }) => {
  // State to track selected answers for each question
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // State to track if the quiz has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  // State to track validation message
  const [validationMessage, setValidationMessage] = useState('');

  // Calculate the score and check if all questions are answered
  const calculateResults = () => {
    const questions = quizQuestions;
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    let answeredQuestions = 0;

    questions.forEach((question, index) => {
      if (selectedAnswers[index] !== undefined) {
        answeredQuestions++;
        if (selectedAnswers[index] === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });

    return {
      score: (correctAnswers / totalQuestions) * 100,
      isComplete: answeredQuestions === totalQuestions,
      correctAnswers,
      totalQuestions
    };
  };

  // Handle radio button selection
  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
    setValidationMessage('');
  };

  // Handle quiz submission
  const handleSubmit = () => {
    const results = calculateResults();
    console.log(results);
    if (!results.isComplete) {
      setValidationMessage('Please answer all questions before submitting.');
      return;
    }
    
    // If score is >= 50%, enable next button through parent component
    if (results.score >= 50) {
        onQuizComplete(true);
    } else {
      onQuizComplete(false);
      setValidationMessage(`You need at least 50% correct answers to proceed. Your score: ${results.score.toFixed(1)}%`);
    }

    setIsSubmitted(true);

  };

  // Get background color based on answer status
  const getOptionBackground = (questionIndex, optionIndex) => {
    if (!isSubmitted) return 'bg-white';
    
    const question = quizQuestions[questionIndex];
    const isSelected = selectedAnswers[questionIndex] === optionIndex;
    const isCorrect = optionIndex === question.correctAnswer;

    if (isSelected && isCorrect) return 'bg-green-100';
    if (isSelected && !isCorrect) return 'bg-red-100';
    if (isCorrect) return 'bg-green-100';
    return 'bg-white';
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex-grow">
        {quizQuestions.map((item, questionIndex) => (
          <div key={questionIndex} className="flex flex-col gap-2 mb-8">
            <p className="text-xl mb-3 font-bold flex gap-2">
              <span className="text-blue-600">Q{questionIndex + 1}.</span>
              {item.question}
            </p>

            {item.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={`flex justify-start items-center gap-3 ${getOptionBackground(
                  questionIndex,
                  optionIndex
                )} text-gray-700 p-3 rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${
                  isSubmitted ? 'cursor-not-allowed' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`question${questionIndex}`}
                  checked={selectedAnswers[questionIndex] === option}
                  onChange={() => handleAnswerSelect(questionIndex, option)}
                  className="cursor-pointer"
                  disabled={isSubmitted}
                />
                <span className="flex-grow">{option}</span>
                {isSubmitted && option === item.correctAnswer && selectedAnswers[questionIndex] === option && (
                  <span className="text-green-600 text-sm font-medium">
                    Correct Answer
                  </span>
                )}
              </label>
            ))}
          </div>
        ))}
      </div>

      {validationMessage && (
        <div className="p-3 rounded-md bg-yellow-50 text-yellow-800 mb-4">
          {validationMessage}
        </div>
      )}

      {!isSubmitted && (
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Submit Answers
        </button>
      )}

      {isSubmitted && (
        <div className="p-4 bg-blue-200 rounded-lg">
          <h3 className="font-bold text-lg mb-2 text-gray-700">Quiz Results</h3>
          <p className="text-gray-600">
            You got {calculateResults().correctAnswers} out of{' '}
            {calculateResults().totalQuestions} questions correct (
            {calculateResults().score.toFixed(1)}%)
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizSection;