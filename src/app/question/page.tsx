"use client";

import { QuestionScreen, ExampleEquationSkeleton } from '@/components/question';
import FeedbackModal from '@/components/question/FeedbackModal';
import { useState } from 'react';

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<{
    isOpen: boolean;
    type: 'correct' | 'incorrect' | 'timeout';
    points?: number;
    multiplier?: number;
  }>({
    isOpen: false,
    type: 'incorrect'
  });

  const handleAnswerChange = (answer: string) => {
    setCurrentAnswer(answer);
  };

  const handleSubmit = (answer: string, metadata: { elapsedMs: number; multiplier: 8 | 4 | 2 | 1 }) => {
    console.log('Answer submitted:', { answer, metadata });
    
    // Parse answer to check if it equals 36
    const isCorrect = checkAnswer(answer);
    
    if (isCorrect) {
      const points = 10 * metadata.multiplier;
      setScore(prev => prev + points);
      setFeedback({
        isOpen: true,
        type: 'correct',
        points,
        multiplier: metadata.multiplier
      });
    } else {
      setFeedback({
        isOpen: true,
        type: 'incorrect'
      });
    }
    
    // Move to next question after showing result
    setTimeout(() => {
      setQuestionNumber(prev => prev + 1);
      setCurrentAnswer('');
    }, 1800); // 1.8 second delay to show the result
  };

  const checkAnswer = (answer: string): boolean => {
    // Clean the answer string
    const cleanAnswer = answer.trim();
    
    // Parse different answer formats
    if (cleanAnswer.includes('×') || cleanAnswer.includes('x') || cleanAnswer.includes('*')) {
      const parts = cleanAnswer.split(/[×x*]/);
      if (parts.length === 2) {
        const num1 = parseInt(parts[0].trim());
        const num2 = parseInt(parts[1].trim());
        return !isNaN(num1) && !isNaN(num2) && num1 * num2 === 36;
      }
    }
    
    // If it's just two digits, try to split them
    if (cleanAnswer.length === 2 && /^\d{2}$/.test(cleanAnswer)) {
      const num1 = parseInt(cleanAnswer[0]);
      const num2 = parseInt(cleanAnswer[1]);
      return num1 * num2 === 36;
    }
    
    // If it's a single number, check if it's 36
    const num = parseInt(cleanAnswer);
    return !isNaN(num) && num === 36;
  };

  const handleTimeout = () => {
    console.log('Time ran out!');
    setFeedback({
      isOpen: true,
      type: 'timeout'
    });
    
    // Move to next question after timeout
    setTimeout(() => {
      setQuestionNumber(prev => prev + 1);
      setCurrentAnswer('');
    }, 1800); // 1.8 second delay to show the timeout message
  };

  const handleFeedbackClose = () => {
    setFeedback(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <QuestionScreen
        score={score}
        questionNumber={questionNumber}
        moduleLabel="Operações Algébricas"
        questionSkeleton={<ExampleEquationSkeleton externalAnswer={currentAnswer} />}
        currentAnswer={currentAnswer}
        onAnswerChange={handleAnswerChange}
        totalMs={60000}
        onSubmit={handleSubmit}
        onTimeout={handleTimeout}
      />
      
      <FeedbackModal
        isOpen={feedback.isOpen}
        type={feedback.type}
        points={feedback.points}
        multiplier={feedback.multiplier}
        onClose={handleFeedbackClose}
      />
    </>
  );
}
