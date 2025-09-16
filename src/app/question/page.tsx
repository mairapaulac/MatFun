"use client";

import { QuestionScreen, ExampleEquationSkeleton } from '@/components/question';
import FeedbackModal from '@/components/question/FeedbackModal';
import { generateRandomProblem, GeneratedProblem } from '@/components/question/skeletons/EquationSkeleton';
import { useState } from 'react';

export default function QuestionPage() {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<GeneratedProblem>(() => generateRandomProblem());
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
      setCurrentProblem(generateRandomProblem());
    }, 1800); // 1.8 second delay to show the result
  };

  const checkAnswer = (answer: string): boolean => {
    // Clean the answer string
    const cleanAnswer = answer.trim();
    
    // Parse different answer formats based on problem type
    if (cleanAnswer.includes('×') || cleanAnswer.includes('x') || cleanAnswer.includes('*')) {
      const parts = cleanAnswer.split(/[×x*]/);
      if (parts.length === 2) {
        const num1 = parseInt(parts[0].trim());
        const num2 = parseInt(parts[1].trim());
        return !isNaN(num1) && !isNaN(num2) && num1 * num2 === currentProblem.result;
      }
    }
    
    // Baseado no tipo do problema, validar de forma diferente
    if (currentProblem.type === 'both_empty') {
      // Se ambos estão vazios, aceitar formato "12" ou "1×2"
      if (cleanAnswer.length === 2 && /^\d{2}$/.test(cleanAnswer)) {
        const num1 = parseInt(cleanAnswer[0]);
        const num2 = parseInt(cleanAnswer[1]);
        return num1 * num2 === currentProblem.result;
      }
    } else if (currentProblem.type === 'first_filled') {
      // Se primeiro está preenchido, aceitar apenas o segundo número
      const num = parseInt(cleanAnswer);
      return !isNaN(num) && currentProblem.firstNumber * num === currentProblem.result;
    } else if (currentProblem.type === 'second_filled') {
      // Se segundo está preenchido, aceitar apenas o primeiro número
      const num = parseInt(cleanAnswer);
      return !isNaN(num) && num * currentProblem.secondNumber === currentProblem.result;
    } else if (currentProblem.type === 'result_empty') {
      // Se resultado está vazio, aceitar apenas o resultado
      const num = parseInt(cleanAnswer);
      return !isNaN(num) && num === currentProblem.result;
    }
    
    // Fallback: se é um número único, verificar se é o resultado
    const num = parseInt(cleanAnswer);
    return !isNaN(num) && num === currentProblem.result;
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
      setCurrentProblem(generateRandomProblem());
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
        questionSkeleton={<ExampleEquationSkeleton externalAnswer={currentAnswer} problem={currentProblem} />}
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
